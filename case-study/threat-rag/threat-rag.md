# Case Study: ThreatRAG — Agentic Threat Intelligence RAG Platform

**Author:** Chanchal S. Verma  
**GitHub:** [github.com/ChanchalS7/threat-RAG](https://github.com/ChanchalS7/threat-RAG)  
**Stack:** Python · FastAPI · LangChain · LangGraph · React · Qdrant · Ollama · PostgreSQL + pgvector · Docker  
**Status:** Production-ready — Phase 1, 2 & 3 complete

---

## Executive Summary

Security analysts spend hours manually searching MITRE ATT&CK, NVD, and OWASP documentation to respond to a single threat. ThreatRAG collapses that workflow into seconds by ingesting authoritative security knowledge bases into a vector store and answering analyst questions with **cited sources** — then going further with an **agentic, multi-agent investigation pipeline** that autonomously researches an IOC (IP, hash, or CVE ID) and writes a validated report.

The system is a spec-first, security-hardened RAG platform: a FastAPI backend orchestrating LangChain (RAG), LangGraph (multi-agent), local Ollama embeddings, a Qdrant vector store, and a responsive React dashboard — all wired together with Docker Compose and hardened against the OWASP LLM Top 10 from the first commit.

---

## Problem Statement

Security Operations Centers face three compounding problems when responding to threats:

1. **Knowledge fragmentation** — The information needed to understand a threat is scattered across MITRE ATT&CK (STIX JSON), the NVD CVE database (REST API), and OWASP documentation (PDFs). Analysts context-switch between three or more sources for a single question.

2. **No citations, no trust** — Generic LLM chat answers security questions confidently but without provenance. In a SOC, an uncited answer is unusable — analysts need to know *which* MITRE technique or *which* CVE record an answer came from.

3. **Manual investigation** — Investigating an IOC end-to-end (look up the CVE, cross-reference the technique, search recent intel, write a report) is entirely manual, repetitive, and slow.

**Goal:** Build a system that answers security questions with cited sources in under two seconds, and can autonomously run a full multi-agent investigation on any IOC — without the analyst leaving a single interface.

---

## Solution Architecture

```
                            User
                              │
                              ▼
              React 18 Frontend (Vite + Tailwind)
                              │  SSE / REST
                              ▼
                       FastAPI Backend
        ┌──────────────┬──────────────┬──────────────────┐
        │              │              │                  │
 /api/v1/query   /api/v1/chat   /api/v1/investigate  /api/v1/ingest
 ThreatRAGChain  ThreatIntel     LangGraph            Ingestion
   (Phase 1)      Agent (P2)     Pipeline (P3)         workers
        │              │              │                  │
        └──────────────┴──────┬───────┴──────────────────┘
                              │
        ┌──────────────┬──────┴───────┬──────────────────┐
        ▼              ▼              ▼                  ▼
  ┌───────────┐  ┌───────────┐  ┌───────────┐    ┌──────────────┐
  │  Qdrant   │  │  Ollama   │  │  Kimchi   │    │ PostgreSQL   │
  │ Vector DB │  │nomic-embed│  │ kimi-k2.6 │    │  + pgvector  │
  │  :6333    │  │  :11434   │  │(OpenAI API│    │   :5432      │
  │768-dim vec│  │ (local)   │  │  compat)  │    │ (P3 reports) │
  └───────────┘  └───────────┘  └───────────┘    └──────────────┘
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Spec-first development** | Every phase was fully specified (acceptance criteria F1.1–F3.13) *before* any implementation code — the spec is the source of truth |
| **FastAPI + async** | All async/await, no sync IO on the hot path; Pydantic v2 models enforce every API contract |
| **LangChain LCEL for RAG** | Composable retrieval → prompt → LLM → sanitise pipeline that streams natively |
| **LangGraph for multi-agent** | LangChain 1.3.x removed `AgentExecutor`; `langgraph.prebuilt.create_react_agent` is the correct 2025 API, and the graph model fits the Researcher→Critic→Reporter loop |
| **OpenAI-compatible LLM (Kimchi)** | Vendor-neutral — swap Kimchi for OpenAI, Groq, or Ollama by changing the base URL |
| **Ollama for local embeddings** | Free, offline, zero-cost `nomic-embed-text` at 768 dimensions |
| **OWASP LLM Top 10 built-in** | Injection detection and output redaction are a first-class `sanitiser.py` module, not a bolted-on afterthought |
| **≤150 lines per file** | One responsibility per file (`store.py`, `embedder.py`, `chain.py`…) keeps the codebase reviewable |

---

## Technical Implementation

### Phase 1 — RAG Core

The heart of Phase 1 is the `ThreatRAGChain` (`backend/app/rag/chain.py`) — an LCEL pipeline that turns an analyst question into a cited answer.

**Retrieval flow:**

```
POST /api/v1/query → injection check → embed question (Ollama)
  → Qdrant cosine search → RAG prompt + LLM (Kimchi) → sanitise output
  → return { answer, sources[] }
```

**Ingestion pipeline** (`rag/ingestion.py`):
- **MITRE ATT&CK** — STIX JSON parsed and filtered to attack-pattern objects
- **OWASP LLM Top 10** — PDF loaded via `PyPDFLoader`, chunked, embedded
- **Custom threat intel** — analyst-uploaded PDFs ingested on demand
- Batching uses `asyncio.Semaphore` to embed concurrently without overrunning Ollama

**Security hardening** (`rag/sanitiser.py`):

Rather than trusting the LLM boundary, every request and response passes through an OWASP-LLM-Top-10 gate — prompt-injection pattern detection on input, HTML escaping and secret redaction on output. This is unit-tested with 10 dedicated tests covering injection patterns, HTML escape, and secret redaction.

**Streaming SSE:**

The RAG answer is streamed token-by-token via FastAPI `StreamingResponse`, giving the analyst a sub-two-second time-to-first-token instead of waiting for the full response.

### Phase 2 — Agentic Loop

Phase 2 adds a **ReAct agent** (`agent/react_agent.py`) built on `langgraph.prebuilt.create_react_agent`, with three tools:

```
ThreatRAGSearchTool  → semantic search over the ingested knowledge base
NVDCVETool           → live CVE lookup against the NVD REST API
TavilySearchTool     → web search fallback for recent intel
```

**Streaming agent thoughts:**

`astream_events(version="v2")` surfaces `on_tool_start` / `on_tool_end` / `on_chat_model_stream` events, which are translated into typed SSE chunks (`AgentThought`, `AgentChunk`, `AgentDone`, `AgentError`) so the UI renders the agent's reasoning and tool calls live.

**Session management** (`agent/session.py`):

A `SessionManager` holds conversation memory with a 30-minute TTL, a cap of 100 concurrent sessions, and background eviction — enough for a free-tier deployment without a persistence layer.

### Phase 3 — Multi-Agent Investigation & Evaluation

Phase 3 is a **LangGraph state machine** (`agent/graph.py`) that runs a full autonomous investigation:

```
researcher_node  →  critic_node  →  reporter_node
    (gather)          (validate)       (write report)
        ↑__________________|
        (iterates if the critique found gaps)
```

- **Researcher** gathers evidence using the Phase 2 tools
- **Critic** validates the findings and can bounce the state back for another research pass
- **Reporter** writes the final structured markdown report

**Report persistence** (`db/reports.py`):

Completed investigations are saved to PostgreSQL with `pgvector`, enabling similarity search across past reports — an analyst can surface previous investigations related to the current IOC.

**Quality evaluation** (`evaluation/ragas_eval.py`):

`POST /api/v1/evaluate` runs **RAGAs** metrics — faithfulness, answer relevancy, context precision, context recall — turning "does the RAG answer well?" into measurable numbers. The import is lazy, so the platform runs even without `ragas` installed (returning zeroed scores).

### Frontend Architecture

The React 18 dashboard (`web/src/`) is organised around the three phases:

- **Chat** — Q&A interface with session management, streaming markdown, and per-message copy
- **KnowledgeBase** — PDF drag-drop ingest, one-click MITRE/OWASP ingest, and a stats chart
- **Investigate** — IOC input → live multi-agent stream → final report
- **Analytics** — RAGAs evaluation form + score-history charts

**Tech stack:** React 18 + TypeScript + Vite + Tailwind CSS + `@tanstack/react-query` + Recharts + `react-markdown`. The `ToolCallTimeline` component animates ReAct tool-call status, and `ReportViewer` renders the streaming report alongside RAGAs score bars.

---

## Results & Metrics

| Metric | Value |
|---|---|
| **RAG query latency** (p50, TTFT) | < 2 seconds |
| **Ingestion throughput** | ≥ 100 chunks/min |
| **Concurrent users** | ≥ 10 (free-tier infra) |
| **Unit tests** | 39/39 passing |
| **Knowledge sources** | MITRE ATT&CK (STIX), OWASP LLM Top 10 (PDF), NVD CVE (live API), custom PDFs |
| **Security posture** | OWASP LLM Top 10 hardened (injection detection + output redaction) |
| **Code quality** | Ruff clean · Mypy strict · ≤150 lines/file |
| **Infrastructure** | 5 Docker services (Qdrant, Postgres+pgvector, Ollama, backend, frontend) |

### Test Breakdown (39 tests)

| Suite | Tests | Coverage |
|---|---|---|
| `test_sanitiser.py` | 10 | Injection patterns, HTML escape, secret redaction |
| `test_ingestion.py` | 5 | MITRE STIX filter, batch size, PDF payload |
| `test_chain.py` | 5 | RAGResponse structure, source fields, doc_type filter |
| `test_tools.py` | 9 | NVD parsing, CVE validation, RAG search, Tavily fallback |
| `test_ragas.py` | 4 | Exception handling, missing package, score model |
| `test_routes.py` | 6 | Health, query, 422/400 validation, SSE, ingest 202 |

**Test isolation:** FastAPI `dependency_overrides` + `AsyncMock` — no real LLM calls in unit tests.

---

## Challenges & Solutions

### Challenge 1: LangChain Removed `AgentExecutor`
**Problem:** The ReAct agent pattern most tutorials use (`AgentExecutor`) was removed in LangChain 1.3.x, breaking the obvious implementation path.  
**Solution:** Migrated to `langgraph.prebuilt.create_react_agent` — the correct 2025 API. This also unified the Phase 2 agent and the Phase 3 multi-agent graph under one framework (LangGraph).

### Challenge 2: Streaming Agent Reasoning to the Browser
**Problem:** A ReAct agent's value is in *showing its work* — but tool calls and token streams are internal LangChain events, not an HTTP response.  
**Solution:** Consumed `astream_events(version="v2")` and mapped `on_tool_start` / `on_tool_end` / `on_chat_model_stream` to a typed SSE protocol (`AgentThought`/`AgentChunk`/`AgentDone`/`AgentError` with `to_sse()`), so the `ToolCallTimeline` renders each step with live status.

### Challenge 3: Prompt Injection in a Security Tool
**Problem:** A security RAG tool ingesting untrusted PDFs and answering free-text questions is itself a prime injection target — the irony of a vulnerable security tool.  
**Solution:** Built `sanitiser.py` as a first-class module implementing OWASP LLM Top 10 controls — input injection-pattern detection (returns HTTP 400) and output HTML-escape + secret redaction — verified by 10 dedicated unit tests.

### Challenge 4: Multi-Agent Loops That Don't Terminate
**Problem:** A Researcher→Critic loop can iterate forever if the Critic is never satisfied.  
**Solution:** Modelled the investigation as an explicit `InvestigationState` in LangGraph with bounded iteration — the Critic can bounce state back to the Researcher, but the graph enforces a terminal path to the Reporter node.

### Challenge 5: Measuring RAG Quality Objectively
**Problem:** "The answers seem good" is not a metric — RAG quality needs to be measurable to be improvable.  
**Solution:** Integrated **RAGAs** (faithfulness, answer relevancy, context precision, context recall) behind `POST /api/v1/evaluate`, with a lazy import so a missing `ragas` dependency degrades gracefully to zeroed scores rather than crashing the app.

---

## Engineering Practices

ThreatRAG was built **spec-first** with an automated quality harness:

- **Specifications before code** — `spec/SPEC.md` plus per-phase specs defined 41 acceptance criteria (F1.1–F3.13) as the source of truth before implementation began.
- **Automated lint gate** — a Claude Code `PostToolUse` hook ran `ruff check` on every Python edit.
- **Purpose-built subagents** — planner, security reviewer, and QA validator agent prompts enforced review discipline.
- **`/validate` skill** — a one-command gate: lint → typecheck → test → health check.

**Validation results:** `ruff check` clean · `tsc --noEmit` no errors · frontend builds in ~2s · 39/39 unit tests passing.

---

## Key Learnings

1. **Citations are the product in security RAG.** An answer without provenance is unusable in a SOC. Returning `sources[]` on every response — not just the answer text — is what makes the tool trustworthy.

2. **Spec-first pays off on multi-phase projects.** Writing 41 acceptance criteria before code meant each phase had an unambiguous "done" definition, and the three phases composed cleanly instead of colliding.

3. **The agent framework landscape moves fast.** `AgentExecutor` was the standard one year and gone the next. Building on `langgraph.prebuilt` and treating the framework as swappable behind a service layer insulated the app from churn.

4. **Security tools must secure themselves.** A RAG pipeline that ingests untrusted documents and answers free text is an injection target. OWASP LLM Top 10 controls belong in a tested module from commit one, not a later hardening pass.

5. **If you can't measure RAG quality, you can't improve it.** RAGAs turned subjective "good answers" into faithfulness and relevancy numbers, making retrieval and prompt changes evaluable rather than vibes-based.

---

## Tech Stack Summary

| Category | Technology | Version |
|---|---|---|
| Backend language | Python | 3.11 |
| API framework | FastAPI + Pydantic v2 | — |
| RAG framework | LangChain + LCEL | 0.3 |
| Multi-agent | LangGraph | 0.2 |
| LLM client | langchain-openai (OpenAI-compat) | — |
| Vector DB | Qdrant | — |
| Local embeddings | Ollama — nomic-embed-text | 768-dim |
| Relational DB | PostgreSQL + pgvector | 17 |
| Evaluation | RAGAs | — |
| Frontend | React + TypeScript | 18 + 5 |
| Build tool | Vite | — |
| Styling | Tailwind CSS | — |
| Charts | Recharts | — |
| Data fetching | TanStack Query | 5 |
| Streaming | Server-Sent Events (SSE) | — |
| Infrastructure | Docker Compose (5 services) | — |
| LLM provider | Kimchi (kimi-k2.6) | — |

---

## Repository

**GitHub:** [github.com/ChanchalS7/threat-RAG](https://github.com/ChanchalS7/threat-RAG)

```bash
git clone https://github.com/ChanchalS7/threat-RAG.git
cd threat-RAG/threatrag
cp backend/.env.example backend/.env   # set KIMCHI_API_KEY
make docker-up && make pull-models && make migrate
make dev        # backend  → http://localhost:8000
make dev-web    # frontend → http://localhost:5173
```

---

*Built as a spec-first learning project to explore cited RAG for security intelligence, LangGraph multi-agent investigation, OWASP LLM Top 10 hardening, and RAGAs-measured quality.*
