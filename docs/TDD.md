# Technical Design Document: Code Journal

**Version:** 1.0
**Status:** Draft
**Last Updated:** 2025-11-19
**Owner:** Engineering Team

---

## 1. Overview

### What We're Building and Why

Code Journal is a web-based CRUD application that enables beginner developers to capture, organize, and reference their learning journey. The application addresses the common problem of scattered notes and lost learnings by providing a centralized, searchable knowledge base that grows with the developer.

**Phase 1 (MVP)** focuses on core CRUD functionality: creating, reading, updating, and deleting journal entries. This phase validates the core value proposition—that a simple, focused tool can help learners retain and find information faster than scattered notes across multiple apps.

The target user is "Upskilling Uma"—a mid-career professional learning to code or automate work tasks. Key requirements are:
- **Speed:** Entry creation in <30 seconds, search results in <10 seconds
- **Simplicity:** First entry created within 2 minutes, no learning curve
- **Reliability:** Data persists across sessions, no data loss

### Key Architectural Approach

The MVP uses a **client-server architecture** with a React frontend and Node.js/Express backend. This approach balances simplicity for Phase 1 with extensibility for future phases (search, tags, multi-device sync).

**Architecture Philosophy:**
- **RESTful API design** for clear separation of concerns and future scalability
- **PostgreSQL database** for reliable data persistence and future query capabilities
- **Server-side rendering** of initial page for fast load times
- **Client-side state management** using React hooks for responsive UI

This is intentionally **not** a serverless or static site approach. While those could work for Phase 1, the roadmap includes features (full-text search, tags, multi-device sync) that benefit from a traditional backend architecture.

### Main Technologies and Patterns

**Frontend Stack:**
- **React 18+** - Component-based UI with hooks for state management
- **React Router 6+** - Client-side routing for SPA experience
- **CSS Modules** - Scoped styling without framework overhead

**Backend Stack:**
- **Node.js 20 LTS** - JavaScript runtime for backend
- **Express 4.18+** - Web framework for RESTful API
- **PostgreSQL 15+** - Relational database for structured data
- **node-postgres (pg)** - PostgreSQL client for Node.js

**Key Design Patterns:**
- **RESTful API** - Standard HTTP methods and resource-based URLs
- **Repository Pattern** - Data access layer abstraction for database operations
- **MVC-like separation** - Controllers handle requests, services contain business logic, repositories manage data
- **Presentational/Container Components** - Clean separation of UI and logic in React

**Development Tools:**
- **Vite** - Fast build tool and dev server for frontend
- **ESLint + Prettier** - Code quality and formatting
- **Jest + React Testing Library** - Unit and integration testing

---

## 2. System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                      │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │ Entry List  │  │Entry Detail │  │ Entry Form  │     │  │
│  │  │   Page      │  │    Page     │  │  (Create/   │     │  │
│  │  │             │  │             │  │   Edit)     │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          React Router (Client-side routing)        │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │           API Client (fetch wrapper)               │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/JSON (REST API)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER (Node.js)                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Express Application                     │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │     Routes Layer (/api/entries)                    │  │  │
│  │  │     - GET    /api/entries       (list all)         │  │  │
│  │  │     - POST   /api/entries       (create)           │  │  │
│  │  │     - GET    /api/entries/:id   (get one)          │  │  │
│  │  │     - PUT    /api/entries/:id   (update)           │  │  │
│  │  │     - DELETE /api/entries/:id   (delete)           │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          Controllers Layer                         │  │  │
│  │  │     - Validate request data                        │  │  │
│  │  │     - Call service methods                         │  │  │
│  │  │     - Format responses                             │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │          Services Layer                            │  │  │
│  │  │     - Business logic                               │  │  │
│  │  │     - Data validation                              │  │  │
│  │  │     - Error handling                               │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │       Repository Layer (Data Access)               │  │  │
│  │  │     - SQL query construction                       │  │  │
│  │  │     - Database connection management               │  │  │
│  │  │     - Result mapping                               │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    entries table                          │  │
│  │  - id (UUID, primary key)                                │  │
│  │  - title (VARCHAR, not null)                             │  │
│  │  - content (TEXT, not null)                              │  │
│  │  - created_at (TIMESTAMP, not null)                      │  │
│  │  - updated_at (TIMESTAMP, not null)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Descriptions

**Client Browser (React SPA):**
- Single-page application providing responsive UI for all user interactions
- Handles routing, form validation, and user feedback without page reloads
- Communicates with backend via RESTful API calls

**Express Application (Node.js Server):**
- Serves static frontend assets (production build)
- Provides RESTful API endpoints for entry CRUD operations
- Handles request validation, business logic, and database interactions
- Returns JSON responses to client

**PostgreSQL Database:**
- Persistent storage for all journal entries
- Ensures data integrity with constraints and transactions
- Supports future features (full-text search, indexing for tags)

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend Framework** | React | 18.2+ | Component-based UI library |
| **Frontend Router** | React Router | 6.20+ | Client-side routing and navigation |
| **Frontend Build Tool** | Vite | 5.0+ | Fast dev server and optimized production builds |
| **Frontend Styling** | CSS Modules | - | Scoped component styling |
| **Backend Runtime** | Node.js | 20 LTS | JavaScript server runtime |
| **Backend Framework** | Express | 4.18+ | Web application framework |
| **Database** | PostgreSQL | 15+ | Relational database |
| **Database Client** | node-postgres (pg) | 8.11+ | PostgreSQL client for Node.js |
| **Input Validation** | express-validator | 7.0+ | Request validation middleware |
| **Environment Config** | dotenv | 16.0+ | Environment variable management |
| **Testing (Backend)** | Jest | 29+ | Unit and integration testing |
| **Testing (Frontend)** | React Testing Library | 14+ | Component testing |
| **Code Quality** | ESLint + Prettier | Latest | Linting and formatting |

### Key Design Patterns

**1. RESTful API Design**
- Resource-based URLs (`/api/entries`, `/api/entries/:id`)
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Appropriate status codes (200, 201, 400, 404, 500)

**2. Repository Pattern**
- Abstracts database operations behind a clean interface
- Enables easy database switching or mocking in tests
- Example: `EntryRepository.findAll()`, `EntryRepository.create(entry)`

**3. Layered Architecture**
- **Routes:** Define endpoints and HTTP methods
- **Controllers:** Handle HTTP requests/responses, call services
- **Services:** Contain business logic, validation, error handling
- **Repositories:** Execute database queries, map results to objects

**4. React Component Patterns**
- **Container Components:** Manage state and API calls (e.g., `EntryListContainer`)
- **Presentational Components:** Pure UI components (e.g., `EntryCard`, `Button`)
- **Custom Hooks:** Reusable state logic (e.g., `useEntries`, `useEntryForm`)

**5. Error Handling Strategy**
- Server returns structured error responses: `{ error: { message, code } }`
- Client displays user-friendly error messages
- All async operations wrapped in try-catch
- Database errors logged but not exposed to client

---

## 3. Core Technical Details

### API Design

**Base URL:** `/api/entries`

**Endpoint Specifications:**

#### 1. List All Entries
```
GET /api/entries
```

**Response (200 OK):**
```json
{
  "entries": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "My first Python script",
      "content": "Learned how to use print() function...",
      "createdAt": "2025-11-13T14:30:00.000Z",
      "updatedAt": "2025-11-13T14:30:00.000Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "error": {
    "message": "Failed to retrieve entries",
    "code": "DATABASE_ERROR"
  }
}
```

---

#### 2. Get Single Entry
```
GET /api/entries/:id
```

**Response (200 OK):**
```json
{
  "entry": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My first Python script",
    "content": "Learned how to use print() function...",
    "createdAt": "2025-11-13T14:30:00.000Z",
    "updatedAt": "2025-11-13T14:30:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Entry with given ID doesn't exist
```json
{
  "error": {
    "message": "Entry not found",
    "code": "NOT_FOUND"
  }
}
```

---

#### 3. Create New Entry
```
POST /api/entries
```

**Request Body:**
```json
{
  "title": "Excel API authentication fix",
  "content": "Use OAuth 2.0 flow with refresh tokens..."
}
```

**Validation Rules:**
- `title`: Required, string, 1-255 characters, trimmed
- `content`: Required, string, 1-50000 characters, trimmed

**Response (201 Created):**
```json
{
  "entry": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Excel API authentication fix",
    "content": "Use OAuth 2.0 flow with refresh tokens...",
    "createdAt": "2025-11-15T10:20:00.000Z",
    "updatedAt": "2025-11-15T10:20:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation failed
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}
```

---

#### 4. Update Existing Entry
```
PUT /api/entries/:id
```

**Request Body:**
```json
{
  "title": "Updated title",
  "content": "Updated content with new information..."
}
```

**Validation Rules:**
- Same as create endpoint
- Both `title` and `content` required (full replacement, not partial update)

**Response (200 OK):**
```json
{
  "entry": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated title",
    "content": "Updated content with new information...",
    "createdAt": "2025-11-13T14:30:00.000Z",
    "updatedAt": "2025-11-15T11:45:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Entry doesn't exist
- `400 Bad Request`: Validation failed

---

#### 5. Delete Entry
```
DELETE /api/entries/:id
```

**Response (204 No Content):**
- Empty body, successful deletion

**Error Responses:**
- `404 Not Found`: Entry doesn't exist
```json
{
  "error": {
    "message": "Entry not found",
    "code": "NOT_FOUND"
  }
}
```

---

**Authentication/Authorization:**
- Phase 1 (MVP): No authentication required (single-user local deployment)
- Phase 4: Add user authentication (JWT or session-based)

**Error Response Format:**
All errors follow consistent structure:
```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": [] // Optional array of field-specific errors
  }
}
```

---

### Data Model

**Database: PostgreSQL 15+**

#### Entries Table

```sql
CREATE TABLE entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index for faster ordering by creation date
CREATE INDEX idx_entries_created_at ON entries(created_at DESC);
```

**Field Specifications:**

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | Primary Key, Auto-generated | Unique identifier for entry |
| `title` | VARCHAR(255) | NOT NULL | Entry title (max 255 chars) |
| `content` | TEXT | NOT NULL | Entry content (unlimited) |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, Default NOW() | Creation timestamp (immutable) |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, Default NOW() | Last update timestamp |

**Database Choice Rationale:**
- **PostgreSQL over SQLite:** Supports concurrent connections, better prepared for Phase 4 multi-device sync
- **UUID over Integer ID:** More secure, avoids enumeration attacks, globally unique
- **TIMESTAMP WITH TIME ZONE:** Handles timezone differences correctly
- **TEXT for content:** No artificial length limit on entry content

**Migration Strategy:**
- Use migration tool (e.g., `node-pg-migrate`) for schema versioning
- Initial migration creates `entries` table
- Future migrations add indexes, columns (tags), or new tables

**Update Trigger for `updated_at`:**
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_entries_updated_at
BEFORE UPDATE ON entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

### Integration Points

**Phase 1 (MVP) - No External Integrations**

The MVP is intentionally self-contained with no external service dependencies:
- ✅ Frontend communicates only with backend API
- ✅ Backend communicates only with PostgreSQL database
- ✅ No third-party APIs or services
- ✅ No external authentication providers

**Internal Integration: Frontend ↔ Backend**

**API Client (Frontend):**
```javascript
// src/api/client.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const entriesAPI = {
  getAll: () => apiRequest('/entries'),
  getById: (id) => apiRequest(`/entries/${id}`),
  create: (entry) => apiRequest('/entries', {
    method: 'POST',
    body: JSON.stringify(entry),
  }),
  update: (id, entry) => apiRequest(`/entries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(entry),
  }),
  delete: (id) => apiRequest(`/entries/${id}`, {
    method: 'DELETE',
  }),
};
```

**Error Handling:**
- Network errors: Display "Unable to connect to server"
- Server errors (500): Display "Something went wrong, please try again"
- Validation errors (400): Display field-specific error messages
- Not found (404): Redirect to entry list with message

**Future Integration Points (Phase 2+):**
- Phase 2: Search API integration (or built-in PostgreSQL full-text search)
- Phase 4: Cloud storage provider for multi-device sync
- Phase 4: OAuth provider (Google, GitHub) for user authentication

---

## 4. Critical Technical Decisions

### Decision 1: PostgreSQL over SQLite

**What we chose:** PostgreSQL 15+ as the database

**Why:**
- **Future-proof:** Roadmap includes multi-device sync (Phase 4) which requires concurrent connections and server deployment
- **Full-text search:** PostgreSQL has built-in full-text search capabilities needed for Phase 2
- **Production-ready:** If app scales, PostgreSQL handles growth without database migration
- **Transactions:** Better ACID guarantees for data integrity
- **Developer familiarity:** PostgreSQL is industry standard, easier to find help/resources

**Alternatives considered:**
- **SQLite:** Simpler setup, file-based, no server required
  - Rejected: Single-writer limitation problematic for multi-device sync
  - Rejected: Migration from SQLite to PostgreSQL in Phase 4 adds unnecessary work
- **MongoDB:** NoSQL flexibility
  - Rejected: Overkill for structured data, relational model fits entries perfectly
  - Rejected: No strong need for schema flexibility

**Trade-off:**
- **Consequence:** More complex local development setup (requires PostgreSQL installation)
- **Mitigation:** Provide Docker Compose setup for one-command database startup
- **Mitigation:** Document PostgreSQL installation for Mac/Windows/Linux

---

### Decision 2: Monorepo with Single Backend

**What we chose:** Single Node.js/Express backend serving both API and static frontend

**Why:**
- **Simplicity:** One deployment, one server process, easier to manage
- **Performance:** No CORS complexity, same origin for API and frontend
- **Cost:** Single hosting service (Render, Railway, Heroku) instead of separate API/frontend hosts
- **Development:** Easier to run locally with single `npm start` command

**Alternatives considered:**
- **Separate API and frontend repos:**
  - Rejected: Adds deployment complexity for no Phase 1 benefit
  - Rejected: CORS configuration adds error-prone steps
- **Serverless (Vercel + Supabase):**
  - Rejected: Free tier limits and vendor lock-in
  - Rejected: Cold starts affect performance targets (<1s load time)

**Trade-off:**
- **Consequence:** Frontend and backend deployed together (can't scale independently)
- **Mitigation:** Acceptable for Phase 1; can split into microservices if scale requires it
- **Future flexibility:** Code structure (layered architecture) makes future separation straightforward

---

### Decision 3: UUIDs over Auto-increment IDs

**What we chose:** UUID v4 for entry IDs

**Why:**
- **Security:** Auto-increment IDs enable enumeration attacks (user can guess entry IDs like 1, 2, 3)
- **Distributed generation:** UUIDs can be generated client-side if needed (offline support in Phase 4)
- **No collision risk:** Globally unique, no coordination needed
- **Privacy:** Entry count not exposed through ID sequence

**Alternatives considered:**
- **Auto-increment integers:**
  - Rejected: Security risk (ID guessing)
  - Rejected: Exposes database size/growth rate
- **Custom short IDs (nanoid):**
  - Rejected: Adds complexity, UUIDs are standard and well-supported

**Trade-off:**
- **Consequence:** UUIDs are larger (36 chars vs ~5 chars) in URLs
- **Consequence:** Slightly slower indexing than integers (negligible at our scale)
- **Acceptable:** Security and future-proofing outweigh URL length

---

### Decision 4: Client-side Routing (SPA) vs Server-side Rendering

**What we chose:** React SPA with client-side routing (React Router)

**Why:**
- **User experience:** Instant navigation between pages without full page reloads
- **Responsive feel:** Matches native app experience for fast interactions
- **Simpler backend:** Server only provides API, no view rendering logic
- **Offline potential:** Easier to add offline support in future (service workers)

**Alternatives considered:**
- **Server-side rendering (SSR) with Next.js:**
  - Rejected: Overkill for Phase 1; no SEO requirements (private tool)
  - Rejected: Adds complexity (server/client code, hydration)
- **Multi-page application (traditional server rendering):**
  - Rejected: Full page reloads hurt UX and violate <1s performance target
  - Rejected: Feels dated for modern web app

**Trade-off:**
- **Consequence:** Initial JavaScript bundle must load before app is interactive
- **Mitigation:** Vite's code splitting keeps initial bundle small (<100KB)
- **Mitigation:** Loading spinner provides feedback during initial load
- **Acceptable:** After first load, all navigation is instant (better overall UX)

---

### Decision 5: No Authentication in Phase 1

**What we chose:** Single-user deployment with no login/authentication

**Why:**
- **MVP validation:** Focus on core value (CRUD functionality) before adding auth complexity
- **Simpler onboarding:** User can start using app immediately, no signup friction
- **Faster development:** Auth adds 1-2 weeks to timeline for proper implementation
- **Local deployment:** Phase 1 intended for personal use (localhost or private server)

**Alternatives considered:**
- **Simple password protection:**
  - Rejected: False sense of security without proper encryption/salting
  - Rejected: Still requires session management, adds complexity
- **OAuth from start:**
  - Rejected: Overkill when multi-user support not in Phase 1 scope
  - Better to add in Phase 4 with multi-device sync

**Trade-off:**
- **Consequence:** App is open to anyone with server URL (if deployed publicly)
- **Mitigation:** Documentation warns against public deployment without authentication
- **Mitigation:** Easy to add basic HTTP auth via reverse proxy (nginx) if needed
- **Future:** Phase 4 adds proper authentication when multi-user support is implemented

---

### Decision 6: CSS Modules over CSS-in-JS or Tailwind

**What we chose:** CSS Modules for component styling

**Why:**
- **Simplicity:** Standard CSS with scoped class names, no new syntax to learn
- **Performance:** Zero runtime overhead (unlike styled-components)
- **Bundle size:** No CSS-in-JS library needed (unlike Emotion/styled-components)
- **Developer experience:** Works with standard CSS knowledge, easier for beginners
- **Debugging:** Standard browser DevTools, no abstraction layer

**Alternatives considered:**
- **Tailwind CSS:**
  - Rejected: Verbose className strings clutter JSX
  - Rejected: Steeper learning curve for developers unfamiliar with utility classes
  - Rejected: Bundle size larger unless PurgeCSS configured
- **Styled-components / Emotion:**
  - Rejected: Runtime overhead for styling
  - Rejected: Additional dependency and learning curve
  - Rejected: Server-side rendering complexity for future phases

**Trade-off:**
- **Consequence:** More files (each component has .module.css file)
- **Consequence:** Global theming requires CSS variables or separate approach
- **Acceptable:** File organization clear, modern editors handle well
- **Future:** Can migrate to CSS-in-JS if strong need emerges (component refactor)

---

## 5. Non-Functional Requirements

### Performance

| Requirement | Target | Measurement Method | Priority |
|-------------|--------|-------------------|----------|
| **Initial page load** | < 2 seconds on 3G connection | Lighthouse performance audit | Must-have |
| **Entry list rendering** | < 1 second with 100 entries | Manual testing with seed data | Must-have |
| **Entry list rendering** | < 2 seconds with 1000 entries | Performance testing with large dataset | Should-have |
| **API response time** | < 200ms for GET requests | Server-side logging of request duration | Must-have |
| **API response time** | < 500ms for POST/PUT/DELETE | Server-side logging of request duration | Must-have |
| **Entry creation** | Complete in < 2 seconds (end-to-end) | User story acceptance criteria | Must-have |
| **Search results** | Return in < 500ms (Phase 2) | Performance testing | Should-have |
| **Time to interactive (TTI)** | < 3 seconds on 3G | Lighthouse performance audit | Should-have |
| **First Contentful Paint (FCP)** | < 1.5 seconds | Lighthouse performance audit | Should-have |

**Implementation Notes:**
- Bundle size kept under 200KB (gzipped) through code splitting
- Lazy load non-critical components (e.g., delete confirmation modal)
- Database queries use indexes on `created_at` for fast sorting
- Implement pagination if entry count exceeds 1000 (Phase 2+)
- Use React.memo() for expensive list rendering components

**Performance Monitoring:**
- Development: Lighthouse CI in PR checks
- Production: Basic server-side logging of API response times
- No analytics or APM in Phase 1 (privacy-first approach)

---

### Security

| Category | Requirement | Implementation | Priority |
|----------|-------------|----------------|----------|
| **Input Validation** | All user input validated server-side | express-validator middleware | Must-have |
| **SQL Injection** | Prevent SQL injection attacks | Parameterized queries (pg library) | Must-have |
| **XSS Prevention** | Prevent cross-site scripting | React auto-escapes content, DOMPurify for user HTML (if added) | Must-have |
| **HTTPS** | All production traffic over HTTPS | Deployment platform enforces (Render, Railway, etc.) | Must-have |
| **CORS** | No CORS needed (same origin) | No CORS middleware (frontend served by same server) | N/A |
| **Rate Limiting** | Prevent API abuse | Not implemented in Phase 1 (single user) | Nice-to-have |
| **Authentication** | No authentication in Phase 1 | Document security limitations | Deferred to Phase 4 |
| **Environment Variables** | Sensitive data in .env files | dotenv package, .env in .gitignore | Must-have |
| **Database Connection** | Secure PostgreSQL connection string | Connection string in environment variable | Must-have |
| **Error Messages** | No sensitive info in errors | Generic error messages to client, detailed logs server-side | Must-have |

**Security Best Practices:**
- Never expose stack traces to client
- Never log passwords or sensitive data
- Use prepared statements for all database queries
- Validate UUID format before database queries
- Sanitize all user input (trim, length limits)
- Use Content Security Policy headers in production

**Known Security Limitations (Phase 1):**
- ⚠️ No user authentication: Anyone with URL can access
- ⚠️ No rate limiting: API endpoints can be abused
- ⚠️ No audit logging: No record of who did what
- ⚠️ Documentation will clearly warn users not to deploy publicly without adding authentication

---

### Reliability

| Requirement | Target | Implementation | Priority |
|-------------|--------|----------------|----------|
| **Data Persistence** | 100% - No data loss | PostgreSQL with ACID guarantees | Must-have |
| **Uptime** | 99%+ for self-hosted deployment | Depends on hosting environment | Should-have |
| **Error Recovery** | Graceful degradation on errors | Try-catch blocks, user-friendly error messages | Must-have |
| **Database Backups** | Daily automatic backups | User responsible (provide documentation) | Should-have |
| **Browser Refresh** | No data loss on page refresh | All state from server, no critical client-only state | Must-have |
| **Concurrent Requests** | Handle multiple API calls gracefully | Node.js async handling, PostgreSQL connection pooling | Must-have |

**Error Handling Strategy:**

**Client-side:**
- Network errors: "Unable to connect to server. Check your connection."
- API errors: Display error.message from server response
- Unexpected errors: "Something went wrong. Please refresh and try again."
- Form validation: Display field-specific errors inline

**Server-side:**
- All route handlers wrapped in try-catch
- Async errors caught by Express error middleware
- Database errors logged to console (structured logging)
- Return appropriate HTTP status codes (400, 404, 500)

**Graceful Degradation:**
- If API fails on entry list load: Show cached entries (if available) + error banner
- If API fails on create: Keep form data, show retry button
- If API fails on delete: Show error, don't update UI (avoid inconsistent state)

**Backup Strategy:**
- Document how to backup PostgreSQL database (pg_dump)
- Recommend automated backups via cron or hosting platform
- Provide restore instructions in README

---

### Scalability

| Metric | Phase 1 Target | Phase 4 Target | Approach |
|--------|----------------|----------------|----------|
| **Concurrent Users** | 1 (single user) | 100+ | Add user authentication, improve database pooling |
| **Entries per User** | 1000 entries | 10,000+ entries | Add pagination, optimize queries |
| **API Requests/sec** | 10 req/sec | 100 req/sec | Add caching (Redis), horizontal scaling |
| **Database Size** | 100 MB | 10 GB+ | Optimize indexes, consider archiving old entries |
| **Response Time** | <500ms (all queries) | <500ms (maintain) | Query optimization, caching, CDN for assets |

**Phase 1 Scalability Decisions:**
- **No pagination:** Load all entries (acceptable for <1000 entries)
- **No caching:** Direct database queries (fast enough for single user)
- **No CDN:** Static assets served by Express (simple deployment)
- **Single server:** No load balancing needed

**Scalability Plan (Future Phases):**
- **Phase 2 (Search/Tags):** Add PostgreSQL full-text search indexes
- **Phase 3 (Rich Content):** Consider image storage (S3/Cloudinary)
- **Phase 4 (Multi-device):** Add Redis caching, CDN for static assets, database read replicas

**How System Grows with Load:**
1. **0-10 users:** Current architecture handles easily
2. **10-100 users:** Add connection pooling, database indexes, basic caching
3. **100-1000 users:** Add Redis cache, CDN, horizontal scaling (multiple server instances)
4. **1000+ users:** Database replication, microservices, dedicated API servers

---

### Browser Compatibility

| Browser | Minimum Version | Support Level | Notes |
|---------|----------------|---------------|-------|
| **Chrome** | 90+ (2021) | Full support | Primary development browser |
| **Firefox** | 88+ (2021) | Full support | Tested regularly |
| **Safari** | 14+ (2020) | Full support | Tested on macOS and iOS |
| **Edge** | 90+ (2021) | Full support | Chromium-based |
| **Mobile Chrome** | 90+ | Full support | Responsive design tested |
| **Mobile Safari** | 14+ | Full support | iOS responsive design |
| **Internet Explorer** | N/A | Not supported | Deprecated browser |

**Technical Requirements:**
- Modern JavaScript (ES2020) - async/await, optional chaining, nullish coalescing
- CSS Grid and Flexbox for layouts
- Fetch API for HTTP requests
- LocalStorage (for future offline support in Phase 4)

**Testing Strategy:**
- Primary testing on Chrome (latest)
- Manual testing on Firefox, Safari before each release
- Use BrowserStack for cross-browser testing if issues arise
- Responsive design tested on mobile viewports (375px, 768px, 1024px)

---

### Accessibility

| Requirement | Standard | Implementation | Priority |
|-------------|----------|----------------|----------|
| **WCAG Level** | AA (minimum) | Semantic HTML, ARIA attributes | Must-have |
| **Keyboard Navigation** | Full keyboard access | All interactive elements tabbable | Must-have |
| **Screen Readers** | Compatible with NVDA, JAWS, VoiceOver | ARIA labels, semantic HTML | Must-have |
| **Color Contrast** | 4.5:1 for text | Test with Lighthouse, manual verification | Must-have |
| **Focus Indicators** | Visible focus states | CSS focus styles on all interactive elements | Must-have |
| **Form Labels** | All inputs labeled | <label> elements or aria-label | Must-have |
| **Alt Text** | All images have alt text | N/A for Phase 1 (no images) | N/A |

**Accessibility Implementation:**
- Use semantic HTML: `<main>`, `<nav>`, `<article>`, `<button>`, `<form>`
- All form inputs have associated `<label>` elements
- Focus management: Focus moves to first input on form load
- Skip to content link for keyboard users
- ARIA live regions for dynamic content updates (success/error messages)
- Keyboard shortcuts documented (Ctrl+Enter to save)

**Testing:**
- Run Lighthouse accessibility audit (target: 95+ score)
- Manual keyboard navigation testing (no mouse)
- Test with NVDA (Windows) or VoiceOver (Mac)
- Color contrast verification with contrast checker

---

### Mobile Responsiveness

**Breakpoints:**
- **Mobile:** 320px - 767px (single column layout)
- **Tablet:** 768px - 1023px (single column with more spacing)
- **Desktop:** 1024px+ (comfortable reading width, centered content)

**Responsive Design Principles:**
- Mobile-first CSS (base styles for mobile, media queries for larger screens)
- Touch-friendly tap targets (min 44x44px per iOS guidelines)
- Readable text without zooming (min 16px font size)
- No horizontal scrolling at any breakpoint
- Forms stack vertically on mobile for easy thumb typing

**Key Responsive Elements:**
- Entry list: Cards stack vertically on mobile, same on tablet/desktop
- Entry form: Full-width on mobile, max-width 800px centered on desktop
- Navigation: Hamburger menu on mobile (if needed), horizontal on desktop
- Buttons: Full-width on mobile, auto-width on desktop

**Testing:**
- Chrome DevTools responsive mode (multiple device presets)
- Real device testing on iPhone and Android
- Test both portrait and landscape orientations

---

## 6. Testing & Deployment

### Testing Approach

**Testing Philosophy:**
- Write tests that verify user-facing behavior, not implementation details
- Focus on integration tests over unit tests (test full workflows)
- Prioritize testing critical paths (CRUD operations)
- Manual testing for UX and visual aspects

**Test Coverage Goals:**
- Backend API endpoints: 80%+ coverage
- Frontend components: 60%+ coverage (focus on logic, not presentation)
- Integration tests for all user stories

---

### Unit Testing

**Backend (Node.js/Express):**
- **Framework:** Jest 29+
- **Coverage Tool:** Built-in Jest coverage

**What to Test:**
- Repository layer: Database operations (CRUD)
- Service layer: Business logic, validation
- Utility functions: Date formatting, input sanitization

**Example Test Structure:**
```javascript
// tests/repositories/entryRepository.test.js
describe('EntryRepository', () => {
  describe('findAll', () => {
    it('should return all entries ordered by created_at DESC', async () => {
      // Arrange: Seed test database
      // Act: Call repository method
      // Assert: Verify results
    });
  });

  describe('create', () => {
    it('should create entry with auto-generated UUID and timestamps', async () => {
      // Test implementation
    });

    it('should throw error if title is missing', async () => {
      // Test validation
    });
  });
});
```

**Frontend (React):**
- **Framework:** Jest + React Testing Library 14+
- **Philosophy:** Test behavior, not implementation (avoid testing state directly)

**What to Test:**
- Component rendering with different props
- User interactions (clicks, form submissions)
- API integration (mock API calls)
- Error states and loading states

**Example Test Structure:**
```javascript
// src/components/EntryForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EntryForm } from './EntryForm';

describe('EntryForm', () => {
  it('should display validation error when title is empty', async () => {
    render(<EntryForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText('Save Entry');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please add a title to your entry')).toBeInTheDocument();
  });

  it('should call onSubmit with form data when valid', async () => {
    const onSubmit = jest.fn();
    render(<EntryForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Content' } });
    fireEvent.click(screen.getByText('Save Entry'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ title: 'Test', content: 'Content' });
    });
  });
});
```

---

### Integration Testing

**Backend API Integration Tests:**
- Test full request/response cycle (route → controller → service → repository → database)
- Use test database (separate from development database)
- Reset database between tests for isolation

**Test Suite:**
```javascript
// tests/integration/entries.test.js
describe('Entries API', () => {
  beforeEach(async () => {
    // Clear test database
    await db.query('DELETE FROM entries');
  });

  describe('POST /api/entries', () => {
    it('should create new entry and return 201', async () => {
      const response = await request(app)
        .post('/api/entries')
        .send({ title: 'Test Entry', content: 'Test content' });

      expect(response.status).toBe(201);
      expect(response.body.entry).toMatchObject({
        title: 'Test Entry',
        content: 'Test content',
      });
      expect(response.body.entry.id).toBeDefined();
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/entries')
        .send({ content: 'Test content' });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/entries', () => {
    it('should return all entries ordered by created_at DESC', async () => {
      // Create test entries
      // Fetch and verify order
    });
  });
});
```

**Frontend E2E Tests (Optional for Phase 1):**
- Use Playwright or Cypress for end-to-end testing
- Test complete user workflows from user stories
- Deferred to Phase 2 due to setup overhead

---

### Manual Testing Checklist

**Before Each Release:**

**Functional Tests:**
- [ ] Create new entry (US-1, US-2)
- [ ] View entry list (US-3)
- [ ] View single entry (US-4)
- [ ] Edit existing entry (US-5)
- [ ] Delete entry with confirmation (US-6)
- [ ] Navigate between pages using all links/buttons
- [ ] Refresh page during each workflow (data persists)

**Validation Tests:**
- [ ] Submit form with empty title (shows error)
- [ ] Submit form with empty content (shows error)
- [ ] Submit form with very long content (saves successfully)
- [ ] Submit form with special characters (saves correctly, displays without breaking)

**Error Handling Tests:**
- [ ] Stop backend server, attempt to create entry (shows network error)
- [ ] Delete entry that doesn't exist (shows 404 error)
- [ ] Navigate to non-existent entry URL (shows error, redirects)

**Performance Tests:**
- [ ] Load entry list with 100 entries (<1 second)
- [ ] Create entry (<2 seconds end-to-end)
- [ ] Run Lighthouse audit (Performance >90, Accessibility >95)

**Cross-Browser Tests:**
- [ ] Test in Chrome (primary)
- [ ] Test in Firefox
- [ ] Test in Safari

**Responsive Tests:**
- [ ] Test mobile viewport (375px width)
- [ ] Test tablet viewport (768px width)
- [ ] Test desktop viewport (1024px+ width)
- [ ] Test on real mobile device (iOS or Android)

**Accessibility Tests:**
- [ ] Navigate entire app using only keyboard
- [ ] Run Lighthouse accessibility audit (95+ score)
- [ ] Test with screen reader (VoiceOver or NVDA)

---

### CI/CD Pipeline

**Continuous Integration (GitHub Actions):**

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: codejournal_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run backend tests
        run: npm run test:backend
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost/codejournal_test

      - name: Run frontend tests
        run: npm run test:frontend

      - name: Build application
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

**CI Checks:**
- ✅ ESLint (code quality)
- ✅ Prettier (code formatting)
- ✅ Backend unit tests
- ✅ Backend integration tests
- ✅ Frontend unit tests
- ✅ Build succeeds (no TypeScript/build errors)
- ✅ Code coverage report uploaded

---

### Deployment Strategy

**Environment Setup:**

| Environment | Purpose | Deployment | Database |
|-------------|---------|------------|----------|
| **Local** | Development | `npm run dev` | Local PostgreSQL |
| **Test** | CI/CD testing | GitHub Actions | Ephemeral PostgreSQL |
| **Production** | User-facing | Manual or CD | Hosted PostgreSQL |

**Deployment Platforms (Choose One):**

**Option 1: Render (Recommended)**
- Free tier includes PostgreSQL database
- Automatic HTTPS
- Easy setup: Connect GitHub repo
- Auto-deploy on push to `main` branch

**Option 2: Railway**
- Free tier with $5 credit/month
- PostgreSQL included
- Simple setup via CLI or dashboard

**Option 3: Self-hosted (Docker)**
- Full control, no vendor lock-in
- Requires server management
- Use provided Docker Compose setup

---

### Deployment Steps (Render Example)

**Initial Setup:**
1. Push code to GitHub repository
2. Create account on Render.com
3. Create PostgreSQL database
   - Note connection string (DATABASE_URL)
4. Create Web Service
   - Connect GitHub repo
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Add environment variable: `DATABASE_URL` (from step 3)
5. Deploy and test

**Subsequent Deployments:**
- Push to `main` branch triggers automatic deployment
- Render builds and deploys new version
- Zero-downtime deployment (new version replaces old)

**Database Migrations:**
- Run migrations manually via Render shell:
  ```bash
  npm run migrate:up
  ```
- Future: Automate migrations in build step (after testing)

---

### Rollout Plan

**Phase 1 MVP Rollout:**

**Week 1-2: Alpha Testing (Internal)**
- Deploy to Render (private URL)
- Developer tests all user stories manually
- Fix critical bugs
- Success criteria: All 6 user stories work end-to-end

**Week 3-4: Beta Testing (5-10 Users)**
- Share URL with 5-10 beta testers
- Gather qualitative feedback (usability survey)
- Monitor for errors (server logs)
- Iterate on feedback (1-2 quick fixes if needed)
- Success criteria: 80%+ positive feedback, no data loss

**Week 5: Production Release**
- Announce to broader audience
- Monitor performance and errors
- Provide support/documentation
- Success criteria: Users create entries daily for 1 week

**Rollback Strategy:**
- If critical bug found: Revert to previous Git commit
- Render allows instant rollback to previous deployment
- Database migrations require manual rollback (SQL scripts)
- Always backup database before migrations

---

### Monitoring

**Phase 1 Monitoring (Minimal):**
- Server logs: Winston logger to console (Render captures logs)
- Error tracking: Log all caught errors to console with stack traces
- Manual checks: Review logs weekly for patterns

**What We Monitor:**
- API response times (logged per request)
- Unhandled errors (caught by Express error middleware)
- Database connection issues
- Build/deployment failures (GitHub Actions notifications)

**What We Don't Monitor (Phase 1):**
- User analytics (privacy-first approach)
- APM tools (Datadog, New Relic) - overkill for single user
- Uptime monitoring - unnecessary for personal use

**Phase 2+ Monitoring:**
- Add Sentry for error tracking (when multi-user)
- Add basic analytics (entry count growth, active users)
- Add uptime monitoring (UptimeRobot, Pingdom)

---

## 7. Implementation Plan

### Overview

**Total Duration:** 4-6 weeks for Phase 1 MVP

**Development Approach:**
- Build vertically (full-stack features end-to-end)
- Start with minimal viable feature, then iterate
- Test each feature as it's completed
- Focus on one user story at a time

---

### Phase Breakdown

#### Phase 1A: Project Setup & Infrastructure (Week 1)

**Tasks:**
1. **Initialize Project Structure**
   - Create monorepo structure (frontend + backend in single repo)
   - Set up package.json with scripts
   - Configure ESLint and Prettier
   - Initialize Git repository

2. **Backend Setup**
   - Initialize Node.js/Express application
   - Set up project structure (routes, controllers, services, repositories)
   - Configure environment variables (dotenv)
   - Set up PostgreSQL connection (pg library)
   - Create database migration tool setup (node-pg-migrate)

3. **Database Setup**
   - Write initial migration: Create `entries` table
   - Write migration: Create `updated_at` trigger
   - Test migrations locally
   - Seed database with test data for development

4. **Frontend Setup**
   - Initialize Vite + React project
   - Set up React Router
   - Configure CSS Modules
   - Create basic app shell (header, main content area)

5. **Development Environment**
   - Create Docker Compose file for PostgreSQL
   - Write setup instructions in README
   - Configure npm scripts (`dev`, `test`, `build`)

**Deliverables:**
- ✅ Project runs locally (`npm run dev`)
- ✅ Database migrations work
- ✅ Frontend displays "Hello World"
- ✅ README with setup instructions

**Dependencies:** None

**Estimated Time:** 3-5 days

---

#### Phase 1B: Backend API (Week 2)

**Tasks:**
1. **Repository Layer**
   - Implement `EntryRepository.findAll()`
   - Implement `EntryRepository.findById(id)`
   - Implement `EntryRepository.create(entry)`
   - Implement `EntryRepository.update(id, entry)`
   - Implement `EntryRepository.delete(id)`
   - Write unit tests for each method

2. **Service Layer**
   - Implement `EntryService` with business logic
   - Add validation logic (title/content required, length limits)
   - Add error handling (not found, validation errors)
   - Write unit tests for validation logic

3. **Controller Layer**
   - Implement `GET /api/entries` (list all)
   - Implement `GET /api/entries/:id` (get one)
   - Implement `POST /api/entries` (create)
   - Implement `PUT /api/entries/:id` (update)
   - Implement `DELETE /api/entries/:id` (delete)
   - Add request validation middleware (express-validator)

4. **Testing**
   - Write integration tests for all API endpoints
   - Test error cases (404, 400, 500)
   - Test with Postman or similar tool manually

**Deliverables:**
- ✅ All 5 API endpoints working
- ✅ 80%+ test coverage on backend
- ✅ API tested with Postman

**Dependencies:** Phase 1A complete

**Estimated Time:** 5-7 days

---

#### Phase 1C: Frontend - Entry List & View (Week 3)

**Tasks:**
1. **API Client**
   - Create `api/client.js` with fetch wrapper
   - Implement `entriesAPI` object with all methods
   - Add error handling for network failures

2. **Entry List Page (US-3)**
   - Create `EntryListPage` component
   - Fetch entries on mount
   - Display entries in list (title + date)
   - Handle loading state
   - Handle empty state
   - Handle error state
   - Add "New Entry" button (navigates to create page)

3. **Entry Detail Page (US-4)**
   - Create `EntryDetailPage` component
   - Fetch entry by ID from URL params
   - Display title, content, and date
   - Add "Edit" button (navigates to edit page)
   - Add "Delete" button (opens confirmation modal)
   - Add "Back to All Entries" link
   - Handle 404 (entry not found)

4. **Routing**
   - Configure React Router routes:
     - `/` → Entry List
     - `/entries/:id` → Entry Detail
     - `/entries/new` → Create Entry (Phase 1D)
     - `/entries/:id/edit` → Edit Entry (Phase 1D)

5. **Styling**
   - Create CSS Modules for list and detail pages
   - Implement responsive design
   - Style buttons and links

6. **Testing**
   - Write tests for EntryListPage
   - Write tests for EntryDetailPage
   - Test with mock API data

**Deliverables:**
- ✅ US-3: View All Entries working
- ✅ US-4: View Single Entry working
- ✅ Navigation between pages working
- ✅ Basic styling complete

**Dependencies:** Phase 1B complete

**Estimated Time:** 5-7 days

---

#### Phase 1D: Frontend - Create & Edit (Week 4)

**Tasks:**
1. **Entry Form Component**
   - Create reusable `EntryForm` component
   - Title input field
   - Content textarea field
   - Client-side validation
   - Display validation errors
   - "Save" and "Cancel" buttons

2. **Create Entry Page (US-1, US-2)**
   - Create `CreateEntryPage` component
   - Use `EntryForm` component
   - Handle form submission (POST to API)
   - Redirect to entry detail on success
   - Handle API errors
   - Auto-focus title field on load
   - Add keyboard shortcut (Ctrl+Enter to save)

3. **Edit Entry Page (US-5)**
   - Create `EditEntryPage` component
   - Fetch existing entry data
   - Pre-populate `EntryForm` with data
   - Handle form submission (PUT to API)
   - Redirect to entry detail on success
   - Handle API errors
   - Warn on unsaved changes (browser beforeunload)

4. **Testing**
   - Write tests for EntryForm
   - Write tests for CreateEntryPage
   - Write tests for EditEntryPage
   - Test validation logic

**Deliverables:**
- ✅ US-1: Create First Entry working
- ✅ US-2: Quick Entry Creation working
- ✅ US-5: Edit Existing Entry working
- ✅ Form validation working

**Dependencies:** Phase 1C complete

**Estimated Time:** 5-7 days

---

#### Phase 1E: Frontend - Delete & Polish (Week 5)

**Tasks:**
1. **Delete Confirmation Modal (US-6)**
   - Create `ConfirmationModal` component
   - Display "Are you sure?" message
   - "Confirm Delete" and "Cancel" buttons
   - Handle delete action (DELETE to API)
   - Redirect to entry list on success
   - Handle API errors

2. **UI Polish**
   - Refine styling (spacing, colors, typography)
   - Add success messages (toast notifications or banners)
   - Add loading spinners for async actions
   - Improve button styling (primary vs secondary)
   - Add favicon and page title

3. **Accessibility**
   - Add ARIA labels where needed
   - Test keyboard navigation
   - Ensure focus management (modals, form errors)
   - Test with screen reader (basic verification)
   - Check color contrast

4. **Performance Optimization**
   - Code splitting (lazy load modal)
   - Optimize bundle size
   - Add React.memo where appropriate
   - Run Lighthouse audit, fix issues

5. **Testing**
   - Write tests for ConfirmationModal
   - Manual testing of all user stories (full walkthrough)
   - Cross-browser testing (Chrome, Firefox, Safari)
   - Mobile responsive testing

**Deliverables:**
- ✅ US-6: Delete Unwanted Entry working
- ✅ All 6 user stories working end-to-end
- ✅ UI polished and accessible
- ✅ Lighthouse score: Performance >90, Accessibility >95

**Dependencies:** Phase 1D complete

**Estimated Time:** 4-6 days

---

#### Phase 1F: Deployment & Testing (Week 6)

**Tasks:**
1. **CI/CD Setup**
   - Create GitHub Actions workflow
   - Configure test database for CI
   - Set up Prettier and ESLint checks
   - Configure automatic test runs on PR

2. **Production Build**
   - Configure Vite production build
   - Test production build locally
   - Optimize assets (compression, minification)
   - Verify environment variable handling

3. **Deployment**
   - Set up Render account
   - Create PostgreSQL database on Render
   - Deploy application to Render
   - Run database migrations on production
   - Test deployed application

4. **Documentation**
   - Write README with:
     - Project description
     - Setup instructions (local development)
     - Deployment instructions
     - Environment variables documentation
     - Security warning (no auth in Phase 1)
   - Add LICENSE file (MIT or similar)
   - Add CONTRIBUTING.md (if open source)

5. **Alpha Testing**
   - Complete manual testing checklist
   - Fix critical bugs found
   - Performance testing (100 entry stress test)
   - Prepare for beta testing

**Deliverables:**
- ✅ Application deployed to Render
- ✅ CI/CD pipeline working
- ✅ Documentation complete
- ✅ Ready for beta testing

**Dependencies:** Phase 1E complete

**Estimated Time:** 3-5 days

---

### Project Timeline

```
Week 1: [========] Project Setup & Infrastructure (Phase 1A)
Week 2: [========] Backend API Development (Phase 1B)
Week 3: [========] Frontend List & Detail Pages (Phase 1C)
Week 4: [========] Frontend Create & Edit (Phase 1D)
Week 5: [========] Delete & Polish (Phase 1E)
Week 6: [====----] Deployment & Testing (Phase 1F)
        ^
        Beta testing begins
```

**Critical Path:**
Phase 1A → Phase 1B → Phase 1C → Phase 1D → Phase 1E → Phase 1F

**Parallelization Opportunities:**
- None (phases are sequential by design)
- Within phases, frontend and backend work can overlap if multiple developers

---

### Development Workflow

**Daily Workflow:**
1. Pull latest changes from `main`
2. Create feature branch: `feature/us-3-entry-list`
3. Develop feature (TDD: write test, implement, pass test)
4. Run linter and tests locally
5. Commit changes with descriptive message
6. Push to GitHub
7. Create Pull Request
8. CI runs automatically (tests must pass)
9. Review and merge

**Branch Strategy:**
- `main` branch: Always deployable, protected
- `feature/*` branches: Individual features/user stories
- No `develop` branch (simple workflow for solo/small team)
- Merge to `main` triggers automatic deployment (CD)

**Code Review:**
- For solo developer: Self-review before merge
- For team: At least one approval required
- Check: Code quality, tests pass, user story acceptance criteria met

---

### Acceptance Criteria for Phase 1 Completion

**Functional:**
- ✅ All 6 user stories (US-1 through US-6) working end-to-end
- ✅ All 57 Gherkin scenarios pass manual testing
- ✅ No critical bugs (data loss, crashes, broken flows)

**Technical:**
- ✅ Backend test coverage ≥80%
- ✅ Frontend test coverage ≥60%
- ✅ All CI checks pass (linter, tests, build)
- ✅ Lighthouse scores: Performance >90, Accessibility >95

**Deployment:**
- ✅ Application deployed and accessible via URL
- ✅ Database migrations run successfully
- ✅ Production environment stable (no crashes after 24 hours)

**Documentation:**
- ✅ README with setup and deployment instructions
- ✅ API endpoints documented (if public)
- ✅ Security limitations clearly documented

**User Validation:**
- ✅ Beta testing with 5-10 users completed
- ✅ 80%+ positive feedback on usability
- ✅ No data loss reported during beta testing

---

## 8. Risks & Open Questions

### Top Risks

#### Risk 1: PostgreSQL Setup Complexity

**Risk:** Users struggle to install and configure PostgreSQL locally, delaying development start

**Impact:** Medium - Blocks development progress

**Probability:** Medium - PostgreSQL setup can be tricky for beginners

**Mitigation:**
- Provide Docker Compose file for one-command PostgreSQL setup
- Document installation for Mac (Homebrew), Windows (installer), Linux (apt/yum)
- Create troubleshooting guide for common PostgreSQL issues
- Consider alternative: Provide cloud-hosted development database (Supabase free tier)

**Contingency:**
- If PostgreSQL proves too difficult: Temporarily use SQLite for local dev, PostgreSQL for production
- Accept technical debt, plan migration in Phase 2

---

#### Risk 2: User Adoption - Too Simple?

**Risk:** Target users find the app too basic and don't see value over existing note-taking tools

**Impact:** High - Invalidates product hypothesis

**Probability:** Low-Medium - PRD addresses specific pain points, but unproven

**Mitigation:**
- Conduct user interviews before building (validate assumptions)
- Beta test with 5-10 real users from target persona
- Gather feedback early and iterate quickly
- Focus on differentiators: code formatting, simplicity, speed

**Contingency:**
- If feedback is poor: Pivot to most-requested features (Phase 2 features like search/tags)
- If no interest: Document learnings, sunset project gracefully

---

#### Risk 3: Scope Creep

**Risk:** Stakeholders or users request features beyond Phase 1 scope during development

**Impact:** Medium - Delays MVP launch

**Probability:** High - Common in software projects

**Mitigation:**
- Clearly document Phase 1 scope in PRD (already done)
- Maintain "Phase 2 backlog" for future features
- Say "no" to new features until Phase 1 complete
- Remind stakeholders of MVP goals when scope creep occurs

**Contingency:**
- If critical feature emerges: Assess impact, potentially swap with existing Phase 1 feature
- If non-critical: Add to Phase 2 backlog, stay focused on Phase 1

---

#### Risk 4: Performance Issues with Large Datasets

**Risk:** App becomes slow when user has 1000+ entries (pagination not in Phase 1)

**Impact:** Low - Affects only heavy users, Phase 1 targets <1000 entries

**Probability:** Low - Most users won't hit this limit in Phase 1

**Mitigation:**
- Test with 1000+ entries during Phase 1F
- If slow: Add pagination before Phase 1 launch (small task)
- Document known limitation: "Optimized for <1000 entries"

**Contingency:**
- If performance unacceptable: Emergency pagination implementation (2-3 days)
- Acceptable workaround: Users can manually archive old entries

---

#### Risk 5: No Authentication Security Risk

**Risk:** User deploys to public URL without authentication, data exposed

**Impact:** High - Privacy breach, security incident

**Probability:** Medium - Users may not read security warnings

**Mitigation:**
- Prominent security warning in README (bold, top of page)
- Add banner in app UI: "⚠️ No authentication enabled - do not deploy publicly"
- Document how to add basic HTTP auth via reverse proxy
- Recommend Render's private services (authentication required)

**Contingency:**
- If user reports security incident: Provide immediate support, help secure deployment
- Document incident, accelerate Phase 4 authentication development

---

#### Risk 6: Database Migration Failure

**Risk:** Production database migration fails, causing downtime or data loss

**Impact:** High - Data loss is unacceptable

**Probability:** Low - Simple schema, careful testing

**Mitigation:**
- Test all migrations locally and in CI before production
- Always backup database before running migrations
- Write rollback migrations for every forward migration
- Dry-run migrations on staging database before production

**Contingency:**
- If migration fails: Immediately rollback to previous version
- Restore database from backup if data corruption occurs
- Document incident, improve migration testing process

---

### Open Questions

#### Q1: Should we support dark mode in Phase 1?

**Context:** Dark mode is popular, but adds scope to Phase 1

**Options:**
- **Option A:** Add dark mode in Phase 1 (CSS variables, toggle button)
- **Option B:** Defer to Phase 2 or Phase 3
- **Option C:** Use system preference (prefers-color-scheme) without toggle

**Decision Needed By:** Before Phase 1E (UI Polish)

**Current Thinking:** Option C (system preference) - low effort, good UX, no toggle needed

**Impact:** Low - Nice-to-have feature, not critical for MVP

---

#### Q2: Should entries support Markdown formatting in Phase 1?

**Context:** PRD mentions plain text for Phase 1, rich text in Phase 3

**Options:**
- **Option A:** Support Markdown in Phase 1 (render on view, plain in edit)
- **Option B:** Plain text only, Markdown in Phase 3
- **Option C:** Store Markdown but don't render (prepare for Phase 3)

**Decision Needed By:** Before Phase 1B (API design)

**Current Thinking:** Option B (plain text only) - simplest, aligns with PRD

**Impact:** Medium - Users may expect formatting, but plain text is acceptable for MVP

**Action:** Add to user interview questions: "Would lack of formatting be a dealbreaker?"

---

#### Q3: How should we handle very long entry content (>50,000 characters)?

**Context:** PRD mentions 50,000 character limit for content validation

**Options:**
- **Option A:** Hard limit at 50,000 chars (show error)
- **Option B:** No limit (PostgreSQL TEXT field supports 1GB)
- **Option C:** Warn at 50,000 chars but allow longer

**Decision Needed By:** Before Phase 1B (API validation)

**Current Thinking:** Option A (hard limit) - prevents abuse, reasonable limit

**Rationale:** 50,000 chars ≈ 10,000 words ≈ 20 pages - more than sufficient for code notes

**Impact:** Low - Unlikely users will hit this limit naturally

---

#### Q4: Should we implement optimistic UI updates or wait for API confirmation?

**Context:** Optimistic updates feel faster but can cause UI inconsistencies on errors

**Options:**
- **Option A:** Optimistic updates (update UI immediately, rollback on error)
- **Option B:** Wait for API (show loading spinner until confirmed)
- **Option C:** Hybrid (optimistic for create/update, wait for delete)

**Decision Needed By:** Before Phase 1C (Frontend development)

**Current Thinking:** Option B (wait for API) - simpler, less error-prone for MVP

**Rationale:** API is fast (<500ms target), loading spinners acceptable

**Impact:** Low - Slight UX difference, not critical for MVP

---

#### Q5: What happens when user loses internet connection mid-action?

**Context:** No offline support in Phase 1, but need error handling

**Options:**
- **Option A:** Show generic network error, suggest refresh
- **Option B:** Show detailed error with retry button
- **Option C:** Implement request queueing (retry automatically when back online)

**Decision Needed By:** Before Phase 1C (Error handling)

**Current Thinking:** Option B (detailed error + retry) - good UX, reasonable scope

**Implementation:** API client catches network errors, components show error state with retry

**Impact:** Medium - Affects user experience during network issues

---

#### Q6: Should we log API requests for debugging?

**Context:** Logging helps debugging but raises privacy concerns

**Options:**
- **Option A:** Log all requests (method, URL, user IP, timestamp)
- **Option B:** Log errors only (no successful requests)
- **Option C:** Log without PII (no IPs, only method/URL/status)

**Decision Needed By:** Before Phase 1B (Backend setup)

**Current Thinking:** Option C (log without PII) - balances debugging and privacy

**Implementation:** Winston logger, log format: `${method} ${path} ${status} ${duration}ms`

**Impact:** Low - Privacy-conscious logging, sufficient for debugging

---

#### Q7: How should we handle special characters in entry titles and content?

**Context:** Users may paste code with special characters (<, >, &, quotes)

**Options:**
- **Option A:** Store as-is, escape on render (React does this automatically)
- **Option B:** Sanitize on input (remove potentially dangerous characters)
- **Option C:** Encode on storage, decode on retrieval

**Decision Needed By:** Before Phase 1B (Backend validation)

**Current Thinking:** Option A (React auto-escapes) - simplest, leverages React's built-in XSS protection

**Implementation:** No special handling needed, React JSX escapes by default

**Impact:** Low - React handles this well, no additional work needed

---

### Technical Debt Accepted for Phase 1

**Intentional shortcuts that will need addressing in future phases:**

1. **No Pagination**
   - Loads all entries at once
   - Acceptable for <1000 entries
   - Phase 2: Add pagination

2. **No Caching**
   - Direct database queries for every request
   - Acceptable for single user
   - Phase 4: Add Redis caching for multi-user

3. **No Request Rate Limiting**
   - API endpoints can be abused
   - Acceptable for single user (localhost)
   - Phase 4: Add rate limiting for public deployment

4. **No Automated Database Backups**
   - User responsible for backups
   - Documented in README
   - Phase 2: Add automated backup scripts

5. **No Audit Logging**
   - No record of who created/edited/deleted entries
   - Acceptable for single user
   - Phase 4: Add audit trail for multi-user

6. **No Error Monitoring (Sentry, etc.)**
   - Basic console logging only
   - Acceptable for Phase 1 beta testing
   - Phase 2: Add Sentry if moving to production

7. **No E2E Automated Tests**
   - Manual testing only
   - Setup overhead too high for MVP
   - Phase 2: Add Playwright/Cypress if needed

---

### Success Criteria Review

**How we'll know Phase 1 is successful:**

**Quantitative:**
- ✅ All 6 user stories completed
- ✅ 80%+ test coverage
- ✅ Lighthouse >90 performance, >95 accessibility
- ✅ No critical bugs in beta testing
- ✅ Users create entries daily for 1 week

**Qualitative:**
- ✅ Beta users report: "This is faster than my current note-taking solution"
- ✅ Beta users report: "I can find my entries easily"
- ✅ Beta users report: "The UI is simple and not overwhelming"
- ✅ No complaints about data loss or crashes

**Learning Goals:**
- ✅ Validate that target users need this solution
- ✅ Identify most-wanted features for Phase 2
- ✅ Understand performance characteristics at scale
- ✅ Assess feasibility of multi-device sync (Phase 4)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-19 | Engineering Team | Initial TDD - All sections complete |

---

## Next Steps

1. **Review and Approve TDD**
   - Technical review with engineering team
   - Review with product owner (align with PRD)
   - Sign-off from stakeholders

2. **Begin Implementation**
   - Set up development environment
   - Start Phase 1A (Project Setup & Infrastructure)
   - Create feature branch: `feature/phase-1a-setup`

3. **Maintain Document**
   - Update as decisions are made (resolve open questions)
   - Document any architectural changes
   - Keep risk mitigation strategies current

---

**End of Technical Design Document**

