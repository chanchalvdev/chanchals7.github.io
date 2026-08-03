# Case Study: Enterprise File Ingestion Platform — Recursive Archive Parsing & IOC Extraction

**Author:** Chanchal S. Verma
**GitHub:** [github.com/chanchalvdev/parser-app](https://github.com/chanchalvdev/parser-app)
**Stack:** Go · Python · React · PostgreSQL · Redis · MinIO · OpenSearch · Docker
**Status:** Working local-first platform — ingestion, archive extraction, text/CSV/JSON parsing, IOC extraction, search, and dashboards operational; XML/XLSX/PDF parsers scaffolded

---

## Executive Summary

Security and data teams routinely receive evidence as a single opaque blob: a 10 GB password-protected archive containing nested archives, which contain log dumps, CSV exports, spreadsheets, PDFs, and infostealer credential files in a dozen inconsistent formats. Getting from *that file* to *searchable, structured, indicator-tagged records* is manual, slow, and easy to get wrong — and a malformed member file part-way through usually kills the whole job.

This project builds a local-first ingestion platform that does it end to end: a browser uploads a multi-gigabyte file directly to object storage via presigned URL, a Go API enqueues the job, and a Python worker recursively unpacks the archive, detects each member's real type, routes it through a parser registry, extracts ten classes of indicator from every record, and bulk-loads the results into PostgreSQL and OpenSearch — while streaming live progress back to a React dashboard.

The design principle throughout is **partial success over total failure**: a corrupt member, an unparseable format, or a failed search index never aborts a job that still has good data to deliver.

---

## Problem Statement

Three problems compound when ingesting real-world evidence archives:

1. **Structure is unknown until you open it.** File extensions lie, archives nest arbitrarily deep, and members arrive in mutually incompatible formats. Any pipeline that requires you to declare the schema up front cannot process the input at all.

2. **Untrusted archives are an attack surface.** Path-traversal members (`../../etc/passwd`), absolute paths, Windows drive paths, and zip bombs with extreme compression ratios all target the extractor itself. Extraction has to be adversarial-input-safe by construction, not by convention.

3. **All-or-nothing pipelines waste good data.** In a 50,000-file archive, some members will be corrupt. A pipeline that fails the job on the first bad file throws away 49,999 successful extractions — and gives the operator no way to see which file broke or why.

A fourth problem is specific to security work: **infostealer logs have no standard.** The same credential record is written as `SOFT:`/`URL:`/`USER:`/`PASS:` by one malware family, `Application:`/`Host:`/`Login:`/`Password:` by another, and `P455W0RD:` by a third. Analysts cannot query across families without first normalizing the grammar.

**Goal:** Turn any archive, of any nesting depth, containing any mix of formats, into searchable structured records with extracted indicators — safely, observably, and without discarding partial results.

---

## Solution Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                    React Dashboard  :5173 → host :5188                │
│  Upload · File tree · Job timeline · Live progress · Search · Charts  │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ REST
┌───────────────────────────────▼──────────────────────────────────────┐
│                     Go API  :8080 → host :8088                        │
│         chi router · CORS · request-id · recovery · RBAC             │
│                                                                       │
│  POST /api/v1/uploads/initiate   →  presigned PUT URL + size policy  │
│  POST /api/v1/uploads/complete   →  create file row, enqueue job     │
│  GET  /api/v1/files/{id}/tree    →  recursive archive tree           │
│  POST /api/v1/files/{id}/password → unlock encrypted archive         │
│  GET  /api/v1/jobs/{id}/events   →  full processing timeline         │
│  GET  /api/v1/search             →  OpenSearch-backed query          │
│  GET  /api/v1/dashboard/*        →  7 aggregation endpoints          │
└──────┬─────────────────┬──────────────────┬──────────────────────────┘
       │                 │                  │
       ▼                 ▼                  ▼
  PostgreSQL 16      Redis 7            MinIO + nginx
  metadata/jobs      job queue          raw objects
       ▲                 │                  ▲
       │                 ▼                  │
┌──────┴─────────────────────────────────────┴─────────────────────────┐
│              Python Worker — IngestionOrchestrator                    │
│                                                                       │
│  1 DETECT   MIME + extension resolve · null-byte sampling            │
│  2 EXTRACT  zip/rar/7z/tar · recursive · zip-bomb + traversal guard  │
│  3 PARSE    txt · csv · json/jsonl · generic · streaming chunks      │
│  4 ENRICH   10 IOC classes · infostealer credential normalization    │
│  5 LOAD     Postgres batch insert · OpenSearch _bulk · job events    │
└───────────────────────────────┬──────────────────────────────────────┘
                                ▼
                        OpenSearch 2.13
                   parsed-records · files indices
```

The client's bytes never traverse the Go API. `initiate` returns a presigned PUT URL, the browser uploads straight to MinIO through an nginx proxy configured with streaming request bodies, and `complete` is a small JSON call that creates the file row and pushes a job onto Redis. This is what makes 10 GB uploads viable without tuning Go's request handling at all.

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Go API + Python worker** | Go handles concurrent HTTP, presigning, and aggregation queries well; Python has the mature archive/parsing/encoding ecosystem (`py7zr`, `rarfile`, `openpyxl`, `charset-normalizer`, `python-magic`). Split by strength rather than forcing one language. |
| **Presigned direct-to-storage upload** | Removes the API from the data path entirely. Upload size becomes a storage + proxy concern, not an application-memory concern. |
| **Redis list as the job queue** | Blocking pop gives a work queue with no broker to operate. Appropriate for a single-tenant local deployment; swappable later. |
| **Recursive orchestration, not a recursive queue** | Child files are processed in-process within the parent's job, so one job ID owns the whole tree and the timeline stays coherent. |
| **Limits in the database, not in env vars** | `max_upload_size_mb`, archive depth, expansion ratio, and batch sizes live in `system_settings` per tenant and are editable at runtime via the admin API — no redeploy to re-tune. |
| **PostgreSQL as source of truth, OpenSearch as a projection** | Search can be rebuilt from Postgres. An indexing failure degrades search, never data integrity. |
| **Parser registry with a text fallback** | New formats are one class plus one registry entry. Anything text-like that matches no specific parser still yields records via `GenericTextParser` instead of failing. |

---

## Technical Implementation

### File type detection

Extensions are untrusted input, so `file_detector.py` layers three signals: MIME sniffing, extension resolution that correctly handles compound suffixes like `.tar.gz`, and a null-byte scan of the first 4 KB to catch binaries masquerading as text. The result is a frozen `FileDetectionResult` carrying `is_archive`, `is_text_like`, `is_binary`, and a `parser_hint` that drives routing.

The MIME layer prefers libmagic via `python-magic` and degrades to `mimetypes.guess_type` when the native library is unavailable — which is currently the deployed behaviour, since `python-magic` is not in the worker image's requirements. The fallback is deliberate rather than incidental: the null-byte scan and extension resolution carry detection on their own, so a missing optional dependency downgrades accuracy instead of breaking ingestion.

### Adversarial-safe archive extraction

Extraction is where untrusted input meets the filesystem, so the guards are enforced in the shared base class that every format extractor inherits — not per format:

- **Path traversal** — member paths are normalized and rejected if they escape the destination: `../` sequences, absolute paths, and Windows drive paths (`C:\...`) all raise before any write.
- **Zip bombs** — three independent ceilings: extracted file count, total extracted bytes, and the expansion ratio (`extracted / archive_size`). Breaching any one raises `ArchiveLimitsExceededError` at the `archive_extract` stage with the actual numbers in the message.
- **Depth** — recursion stops at `max_archive_depth` and emits an explicit `worker.archive_depth_limit` event rather than silently truncating.

All limits are loaded per tenant from `system_settings` at job start.

### Encrypted archives as a first-class state

A password-protected archive is not an error, it is a state. The job transitions to `PASSWORD_REQUIRED` and parks. The UI surfaces it, the operator submits a password via `POST /api/v1/files/{file_id}/password`, and processing resumes. Wrong passwords transition to `WRONG_PASSWORD` and are recorded as attempts against `archive_password_refs` — passwords are stored as reference hashes, never plaintext.

### The parser layer

A `ParserRegistry` selects the first parser whose `can_parse()` accepts the detection result. Four are implemented; three are registered scaffolds that claim their extensions but raise `UnsupportedParserError` — an honest placeholder rather than a silent no-op, so an `.xlsx` upload produces a visible `NO_PARSER_FOUND` error in the dashboard instead of an empty success:

| Parser | Handles | Status |
|---|---|---|
| `txt` | `txt`, `log`, `out`, `err`, any `text/plain` | implemented |
| `csv` | `csv.Sniffer` delimiter detection, header cleaning | implemented |
| `json` | `json` and `jsonl` | implemented |
| `generic_text` | fallback for anything text-like | implemented |
| `xml` | `xml` | scaffold |
| `excel` | `xlsx` | scaffold |
| `pdf` | `pdf` | scaffold |

The TXT parser adapts to file size: under 10 MB it yields one record per line for maximum granularity; at or above, it switches to 500-line chunks so a multi-gigabyte log does not produce hundreds of millions of rows. Encoding is detected by sampling with `charset-normalizer` and falling back through UTF-8 → detected → latin-1, which is guaranteed to decode any byte sequence.

### Entity and IOC extraction

Every text record is scanned for ten indicator classes: IPv4, emails, URLs, domains, timestamps, MD5, SHA1, SHA256, CVE IDs, and Bitcoin addresses. Each list is deduplicated case-insensitively while preserving first-seen casing. Domain matching post-filters on the following character to avoid capturing the host portion of an already-matched URL.

### Infostealer normalization

The most domain-specific piece is `infostealer.py`, which teaches the TXT parser the grammar of stealer logs:

**Category routing** — files are classified by name and parent directory: `Passwords.txt`, `_AllPasswords_list.txt`, `UserInformation.txt`, `InstalledSoftware.txt`, `ProcessList.txt`, and directories like `Cookies/`, `Autofills/`, `FileGrabber/`. The category is attached to `structured_data.stealer_category` so analysts can facet on it.

**Credential-block grammar** — stealer families spell the same four fields differently. The parser folds every spelling into a canonical set:

```
application ← soft, software, browser, application, app, storage, profile
url         ← url, host, hostname, website, web, uri, link
username    ← login, user, username, usr, email, account
password    ← password, pass, passwd, pwd
```

Keys are additionally normalized through a leetspeak translation table, so `P455W0RD:` resolves to `password`. Records are delimited by blank lines *or* by a repeated field — the latter matters because many dumps omit blank lines entirely between blocks.

**Secrets are hashed at the parser boundary.** Passwords become `secret_hash` (SHA-256) and the plaintext never leaves the function. Nothing downstream — Postgres, OpenSearch, the dashboard — ever sees a cleartext credential. This was a deliberate constraint: the platform's job is to make credential *exposure* searchable, not to build a searchable credential database.

A subtlety worth recording: small password dumps are parsed line-by-line, which means multi-line credential blocks never assemble in the per-line path. The parser therefore buffers password-dump text (capped at 8 MB) and emits one consolidated `stealer_credential` record per file at the end.

### Loading and progress

Records stream from the parser as an iterator and are flushed to PostgreSQL in batches of 1,000, with the same batch mirrored to OpenSearch via `_bulk`. Search-index failures are caught, recorded in `search_index_status`, emitted as `INDEXING_FAILED` events — and then *swallowed*, because a search outage should not fail a job whose data landed correctly in Postgres.

Progress reporting handles a real constraint: while streaming, the total record count is unknown, so a percentage cannot be computed honestly. The solution is an asymptotic curve over the 10–90% band:

```python
fraction = records_parsed / (records_parsed + 5000)
percent  = 10.0 + (90.0 - 10.0) * fraction
```

It is monotonic, always advancing, and never claims completion — only `mark_job_completed()` sets 100. Progress updates are wrapped in a bare `except` and logged at debug level: a progress write must never be the reason a job fails.

### Failure isolation

The orchestrator distinguishes root failures from child failures. A child that raises `PARSE_FAILED` is logged, recorded in `parser_errors`, and skipped — the loop continues to the next member. Only a root-file failure aborts the job. This is what turns "one corrupt file in 50,000" from a total loss into a line item in the error breakdown dashboard.

### Dashboard aggregation

Seven aggregation endpoints back the dashboard. The top-entities query originally ran five near-identical `UNION ALL` branches over `parsed_records`, one per entity type, each with its own `jsonb_typeof` guard. It was rewritten to drive extraction from a `VALUES` key map — halving the query, and fixing a real bug in the process: it queried `ip_addresses` while the worker actually writes the key `ipv4`, so IP indicators never appeared in the dashboard. The map now covers both keys.

---

## Results & Metrics

| Metric | Value |
|---|---|
| **Max upload size** | 10 GB (presigned direct-to-MinIO PUT) |
| **Archive formats** | ZIP, RAR, 7Z, TAR, TAR.GZ/TGZ — recursive, nested |
| **Max archive depth** | 20 (configurable per tenant at runtime) |
| **Parsers** | 4 implemented (txt, csv, json/jsonl, generic text) + 3 registered scaffolds (xml, xlsx, pdf) |
| **IOC classes extracted** | 10 per record |
| **Batch size** | 1,000 records per Postgres insert / OpenSearch bulk |
| **Database schema** | 15 tables, tenant-scoped, 35 indexes |
| **API endpoints** | 31 REST routes + Swagger UI at `/docs` |
| **Codebase** | ~8,700 lines Go · ~5,800 lines Python · ~750 lines TypeScript · ~370 lines SQL |
| **Tests** | 32 worker tests (archive safety, parsers, detection, entities, infostealer) + Go handler/service/repository tests — all passing |
| **Infrastructure** | 8 Docker Compose services |

### Sample output — infostealer credential record

**Input** (`FileGrabber/Passwords.txt`, mixed-family formatting):

```
SOFT: Chrome
URL: https://mail.example.com
USER: victim@example.com
P455W0RD: hunter2
```

**Output** (`record_type: "stealer_credential"`):

```json
{
  "record_type": "stealer_credential",
  "structured_data": {
    "stealer_category": "stealer_password",
    "credential_count": 1
  },
  "extracted_entities": {
    "credentials": [{
      "application": "Chrome",
      "url": "https://mail.example.com",
      "username": "victim@example.com",
      "secret_hash": "f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7"
    }]
  }
}
```

The leetspeak key resolved, the block assembled across four lines, and the password left as a hash.

---

## Challenges & Solutions

### Challenge 1: Multi-gigabyte uploads through an application server
**Problem:** Routing a 10 GB file through the Go API means buffering or streaming it through application memory, plus timeouts at every hop.
**Solution:** Take the API out of the data path. `initiate` issues a presigned PUT; the browser uploads directly to MinIO through an nginx proxy with `proxy_request_buffering off` and `client_max_body_size` sized above the ceiling. The API only ever handles two small JSON calls. The load-bearing limit became a database setting rather than a server tuning parameter.

### Challenge 2: Zip bombs and path traversal in untrusted archives
**Problem:** Extraction of attacker-supplied archives can overwrite arbitrary paths or exhaust disk.
**Solution:** Enforce guards in the shared base extractor so every format inherits them: normalized member paths rejecting `../`, absolute, and drive-letter paths; and three independent ceilings on file count, total bytes, and expansion ratio. Ten dedicated tests cover the guards, including a zip bomb ratio case and a traversal member that must be rejected before it is written.

### Challenge 3: Multi-line credential blocks in line-by-line parsing
**Problem:** Small files are parsed one record per line for granularity, but a stealer credential block spans four lines — so blocks never assembled, and the feature silently produced nothing on exactly the files it targeted.
**Solution:** Buffer password-dump text during the line pass (capped at 8 MB to bound memory), then reassemble blocks after the stream ends and emit a single consolidated `stealer_credential` record. Line records and the credential record coexist, so nothing that previously worked changed behaviour.

### Challenge 4: Honest progress for an unbounded stream
**Problem:** The job sat at 5% until it flipped to 100%, because total record count is unknown mid-stream and any naive percentage would be a lie.
**Solution:** An asymptotic curve over the 10–90% band that is monotonic in records parsed and never reaches 90%. It communicates *activity and rough scale* without claiming knowledge the system doesn't have — and it is best-effort, wrapped so a failed progress write can never fail a job.

### Challenge 5: One bad file killing a 50,000-file job
**Problem:** The natural exception path aborts the whole job on any member failure.
**Solution:** Explicitly separate root from child failures. Child parse failures are recorded in `parser_errors`, emitted as `PARSING_ERROR` events, and skipped; the orchestration loop continues. Only a root failure aborts. Operators see exactly which members failed and why, in the error-breakdown dashboard, while keeping every successfully parsed record.

### Challenge 6: A dashboard panel that was always empty
**Problem:** The top-entities panel never showed IP addresses.
**Solution:** The Go aggregation query read the JSON key `ip_addresses`, but the Python worker writes `ipv4`. Rewriting the five `UNION ALL` branches as a `VALUES` key map made the mismatch visible immediately and let both keys be mapped to the same output type — the kind of bug that hides indefinitely inside duplicated SQL.

---

## Future Phases

### Phase 1 — Distributed workers
- Move child-file processing from in-process recursion to individually queued jobs so a single deep archive can fan out across worker replicas
- Idempotency keys and at-least-once delivery semantics on the Redis consumer
- Per-file retry with backoff, independent of parent job state

### Phase 2 — Deduplication & content addressing
- SHA-256 is already computed for every file; use it to skip re-parsing identical members across uploads
- Content-addressed storage layout to collapse duplicate objects in MinIO

### Phase 3 — Parser expansion
- Complete the three registered scaffolds: XML (element-wise extraction), XLSX (`openpyxl` read-only streaming), PDF (text-layer extraction)
- Email formats (PST, MBOX, EML), SQLite databases (browser history/cookie stores), Windows Registry hives, and EVTX event logs
- Add `python-magic` to the worker image so content-based MIME detection is active rather than falling back to extension mapping

### Phase 4 — Enrichment integrations
- Reputation lookups for extracted IOCs (VirusTotal, AbuseIPDB, Shodan) with local caching
- Breach-corpus correlation for `secret_hash` values without ever handling plaintext
- MITRE ATT&CK tagging of stealer artifacts

### Phase 5 — Access control & audit
- Full JWT auth with analyst/admin/read-only roles (`audit_logs` and `RequireRole` groundwork already in place)
- Per-tenant OpenSearch index isolation
- Signed, exportable audit trails for chain-of-custody

### Phase 6 — Operations
- Prometheus metrics for both API and worker; Grafana dashboard
- CI matrix across Go, Python, and frontend with coverage gates
- Kubernetes Helm chart with worker autoscaling on queue depth

---

## Key Learnings

1. **Take the application server out of the data path.** The single highest-leverage decision was presigned direct-to-storage upload. It turned "how do we handle 10 GB requests" — a hard application problem — into "what is `client_max_body_size`" — a configuration line. Multi-gigabyte support then cost almost nothing.

2. **Enforce security invariants in the base class.** Path-traversal and expansion-ratio checks live in `BaseArchiveExtractor`, so ZIP, RAR, 7Z, and TAR cannot each forget them independently. A guard that must be remembered per implementation is a guard that will eventually be missed.

3. **Partial success is a feature, not a compromise.** Distinguishing root from child failure changed the platform's character: it degrades gracefully instead of failing atomically, which is what makes it usable on real, messy, partially-corrupt evidence.

4. **Runtime configuration beats redeploys.** Putting limits in `system_settings` rather than environment variables meant raising the upload ceiling from 512 MB to 10 GB was a seed value and an admin API call — not a rebuild.

5. **Duplicated SQL hides bugs.** Five near-identical `UNION ALL` branches concealed a key mismatch that made an entire dashboard panel permanently empty. Collapsing them to a `VALUES` map surfaced the bug on sight. Repetition isn't just verbose; it is where defects go to be invisible.

6. **Hash secrets at the boundary where they are recognized.** Hashing inside `parse_credential_blocks` — the exact function that identifies a value as a password — means no downstream component can leak what it never receives. Deciding *where* a secret stops existing matters more than deciding how it is stored.

---

## Tech Stack Summary

| Category | Technology | Version |
|---|---|---|
| API language | Go | 1.23 |
| HTTP router | chi | 5 |
| Worker language | Python | 3.11 |
| Archive handling | py7zr · rarfile · tarfile · zipfile | 0.20 · 4.2 |
| Streaming JSON | ijson | 3.3 |
| Encoding detection | charset-normalizer | 3.3 |
| Type detection | mimetypes (+ optional libmagic) | — |
| Database | PostgreSQL | 16 |
| Queue | Redis | 7 |
| Object storage | MinIO + nginx proxy | 1.27 |
| Search | OpenSearch + Dashboards | 2.13 |
| Frontend | React + TypeScript | 18 + 5 |
| Build tool | Vite | 6 |
| Styling | Tailwind CSS | 3 |
| Data fetching | TanStack Query | 5 |
| Charts | Recharts | 2 |
| State | Zustand | 5 |
| Infrastructure | Docker Compose | — |

---

## Repository

**GitHub:** [github.com/chanchalvdev/parser-app](https://github.com/chanchalvdev/parser-app)

```bash
git clone https://github.com/chanchalvdev/parser-app.git
cd parser-app
cp .env.example .env
make up && make migrate && make seed && make search-init
# Web UI:  http://localhost:5188
# API:     http://localhost:8088/docs
```

---

*Built to explore adversarial-input-safe file processing, streaming parser design, and the operational problem of turning opaque evidence archives into searchable structured data.*
