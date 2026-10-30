# Case Study: AgentOps AI — Local-first RAG & Agent Platform

**Author:** Chanchal S. Verma  
**Stack:** Python · FastAPI · PostgreSQL + pgvector · Ollama · Alembic · Docker · GitHub Actions  
**Status:** Foundation complete (Day 1 of a 5-day plan). The agent harness, evaluation and web UI are not built yet.

---

## Executive Summary

AgentOps AI is a production-minded platform for grounded AI that runs entirely on local, free models. The finished foundation takes documents in, searches them with hybrid retrieval, and answers questions with citations that are checked against the evidence, all with tenant isolation applied in one place.

It is built bottom-up on purpose. An agent can only be as trustworthy as the retrieval, isolation and error handling beneath it, so those came first. The current pipeline is deliberately simple and non-agentic: it is the baseline the planned agent loop and LangGraph workflow will be measured against.

---

## Problem Statement

RAG demos tend to work until they meet real documents:

1. **Conflicting versions** — A newer document contradicts an older one, and search returns both with no sense of which is current.

2. **Missed exact terms** — Vector search finds related meaning but can miss the exact identifier or phrase a person typed.

3. **Tenant leakage** — One missing filter in one query can expose another customer's data.

4. **Invented sources** — A model can cite a document it never saw, or answer when the documents don't contain the answer.

**Goal:** Solve these before any agent is given tools, on a laptop, at zero model cost.

---

## Solution Architecture

```
          CLI (agentops ingest | search | ask)      API clients (X-API-Key)
                         │                                  │
                         │ direct, no server                │ HTTP
                         └────────────────┬─────────────────┘
                                          ▼
                           FastAPI Backend & Shared Services
        ┌──────────────────┬──────────────┴───┬──────────────────┐
        │                  │                  │                  │
 /api/v1/documents  /retrieval/search    /rag/answer       /api/v1/llm/chat
    Ingestion        Hybrid Retriever  Grounded Answerer      LLM Router
        │                  │                  │                  │
        └──────────────────┴────────┬─────────┴──────────────────┘
                                    │
             ┌───────────────┬──────┴───────┬───────────────────┐
             ▼               ▼              ▼                   ▼
      ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────────┐
      │ PostgreSQL │  │  qwen3:8b  │  │ qwen3:1.7b │  │ nomic-embed-text │
      │ + pgvector │  │  answers   │  │ small role │  │   768-dim (local)│
      └────────────┘  └────────────┘  └────────────┘  └──────────────────┘
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Reciprocal rank fusion** | Cosine similarity and `ts_rank_cd` live on incomparable scales. RRF works on ranks, needs no per-corpus tuning, and rewards agreement. |
| **pgvector inside Postgres** | One system and one transaction for chunks and status, with SQL joins for tenant, status and metadata filters. The cost is a lower scale ceiling than a dedicated vector store. |
| **Two-phase ingestion** | Bad files fail fast with a 4xx and are never stored; slow embedding doesn't hold the request. |
| **Atomic READY** | Chunks, status and version changes commit in one transaction, so a partially searchable document can't exist. |
| **404 for cross-tenant reads** | A 403 would confirm that the ID exists for someone else. |
| **Hashed API keys** | Keys are stored as digests and compared with no early exit, so a debug print or heap dump doesn't reveal them. |
| **Fallback on transient errors only** | Bad output is a quality problem. Another provider won't fix it, and falling back would hide bugs and send data to a hosted model unnecessarily. |
| **No evidence, no model call** | When retrieval finds nothing, no tokens are spent and there is nothing to invent from. |

---

## Technical Implementation

### Ingestion

```
upload → validate (size, extension, magic bytes, UTF-8) → extract → normalize
       → store (idempotent on tenant + sha256, versioned by filename) → 202
background → chunk → embed → one transaction: replace chunks + mark READY + demote older versions
```

- **Validation** — an extension allowlist, a `%PDF-` check, rejection of encrypted PDFs and binary content, and UTF-8 checks.
- **Normalization** — NFKC, control and zero-width characters stripped, PDF pages preserved.
- **Chunking** — a structured chunker that respects headings and paragraphs is the default. A fixed-window chunker stays as a baseline for later comparison.
- **Stable chunk IDs** — the same document, configuration and content always produce the same ID, so citations survive a re-run.

### Retrieval

Every retriever builds on `scoped_select`, the single base query that filters both the chunk and its document by tenant, and limits results to READY, latest-version documents.

- **Vector search** uses HNSW cosine with an iterative scan, so a selective tenant filter still returns enough results.
- **Keyword search** uses `websearch_to_tsquery`, rewritten to OR matching and ranked with `ts_rank_cd`.
- **Hybrid search** fuses both with RRF (k=60), then removes duplicates by text hash.

### Grounded Answers

```
retrieve → select evidence (8,000-character budget) → no evidence? return insufficient_evidence
         → fence as untrusted <source id="S1"> blocks → main model with JSON-schema output
         → validate citations → at most one correction turn → cited answer with usage, cost, timings
```

Retrieved text is treated as untrusted. It sits inside `<source>` fences, the fence tags are escaped so a document can't close its own block and pose as instructions, and the system prompt says never to follow instructions found in evidence.

Each answer returns a status: `answered`, `insufficient_evidence` or `failed_validation`.

### LLM Layer

Provider-neutral contracts sit in front of Ollama, an OpenAI-compatible provider and a fake provider for tests. The router maps roles to models, retries with full-jitter backoff, and falls through to the next provider only on transient errors. Cost for local models is reported as `0`; a hosted model with no configured price reports `unavailable`, never a guess.

---

## Results & Metrics

| Metric | Value |
|---|---|
| **Tests** | 107 passing (unit and integration on real Postgres + pgvector) |
| **Live model tests** | 3 passing against real Ollama models |
| **Code quality** | Ruff clean · Mypy strict · GitHub Actions CI passing |
| **Model cost** | $0 (local models) |
| **Grounded answer time** | ~6–17 s on an Apple M4 with 16 GB |
| **Model throughput** | qwen3:8b ≈ 16 tok/s · qwen3:1.7b ≈ 52 tok/s |
| **Sample corpus** | 4 synthetic documents with deliberate cross-document conflicts |

Recorded live runs:

- A v1 vs v2 question was answered with both documents cited.
- An out-of-scope question returned `insufficient_evidence`.
- A PDF answer cited its page.
- A second tenant saw 0 results.

---

## Challenges & Solutions

### Challenge 1: Natural Questions Matched Nothing
**Problem:** A live run showed 0 keyword hits, because `websearch_to_tsquery` requires every term to match.  
**Solution:** Rewrote the query to OR matching. `ts_rank_cd` still ranks multi-term matches higher, and RRF filters the noise.

### Challenge 2: The Fix Inverted Negation
**Problem:** A review found that the OR rewrite turned `failover -patroni` into `'failov' | !'patroni'`, which matched nearly every chunk.  
**Solution:** `split_negations` now pulls negated terms out before parsing and applies them as a separate `NOT` filter, guarded by regression tests.

### Challenge 3: Tenant Context Lost in a Sync Dependency
**Problem:** `get_principal` was a sync `def`, so FastAPI ran it in a threadpool copy of the context. The tenant `ContextVar` never reached the endpoint, and log lines inside handlers carried `tenant_id: null`.  
**Solution:** Made `get_principal` an `async def`, with an integration test verified to fail against the sync version.

### Challenge 4: Filtered Vector Search Returned Too Little
**Problem:** HNSW filters after the scan, so a selective tenant filter could return fewer results than requested.  
**Solution:** Enabled an iterative scan with `strict_order`, scoped by `SET LOCAL` to the transaction. Partitioning per tenant was rejected as premature.

---

## Known Limitations

- Citations are checked for existence, not entailment. A cited source may not fully support the claim.
- There is no relevance threshold yet, so vector search always returns its nearest neighbours. Out-of-scope questions still reach the model, which must report `insufficient_evidence` itself.
- Background indexing runs in-process, so a crash mid-indexing leaves a document stuck in `processing`.
- There is no rate limiting yet.
- The OpenAI-compatible fallback is mock-tested only, with no live hosted call verified.
- Scanned PDFs are rejected, because there is no OCR.

---

## What's Next

The remaining plan covers a policy-gated agent harness, a custom agent loop, a LangGraph workflow with human approval, sandboxed workspace tools, evaluation, drift monitoring and a web UI. None of this is built yet.

---

## Key Learnings

1. **Build the baseline first.** A simple, non-agentic pipeline gives the agent something to be measured against.

2. **Put isolation in one place.** A single tenant-scoped base query is far easier to trust than a filter repeated in every retriever.

3. **Run it for real.** The keyword bug only showed up in a live run.

4. **Don't invent numbers.** Reporting cost as `unavailable` is more useful than a guess.

---

## Tech Stack Summary

| Category | Technology | Version |
|---|---|---|
| Backend language | Python | 3.13 |
| API framework | FastAPI + Pydantic | — |
| Database | PostgreSQL + pgvector | 17 + 0.8.1 |
| Data access | SQLAlchemy (async) + Alembic | — |
| Local models | Ollama — qwen3:8b, qwen3:1.7b | — |
| Embeddings | Ollama — nomic-embed-text | 768-dim |
| Tooling | uv · Ruff · Mypy · pytest | — |
| Infrastructure | Docker Compose · GitHub Actions | — |

---

## Repository

The repository is private for now, so a public link isn't available.

---

*Built as a learning project to explore production RAG foundations for agentic systems, on local models.*
