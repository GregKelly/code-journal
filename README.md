# Code Journal

A web-based learning journal for beginner developers to capture, organize, and reference their coding journey.

## Overview

Code Journal helps developers document their learning by providing a simple, focused interface for creating and managing journal entries. Built with React, Node.js, Express, and PostgreSQL.

### Key Features (Phase 1 MVP)

- ✅ Create, read, update, and delete journal entries
- ✅ Fast entry creation (<30 seconds)
- ✅ Chronological entry list (newest first)
- ✅ Clean, accessible, mobile-responsive interface
- ✅ Automatic timestamps
- ✅ Form validation with helpful error messages
- ✅ Keyboard shortcuts (Ctrl+Enter to save)
- ✅ **Comprehensive test suite** (80%+ backend, 60%+ frontend coverage)

## Prerequisites

- **Node.js** 20+ (you have v22.18.0 ✓)
- **Docker** and **Docker Compose** (for PostgreSQL)
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example server/.env

# The default values should work for local development
```

### 3. Start the Database

```bash
# Start PostgreSQL using Docker Compose
npm run db:up

# Wait a few seconds for PostgreSQL to initialize
```

### 4. Run Database Migrations

```bash
# Create the entries table
npm run migrate:up
```

### 5. Start the Development Servers

```bash
# Start both frontend and backend servers
npm run dev
```

This will start:
- **Backend API** at http://localhost:3000
- **Frontend** at http://localhost:5173

Open http://localhost:5173 in your browser to use the application!

## Project Structure

```
code-journal/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
├── server/                  # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Database operations
│   │   ├── routes/         # API routes
│   │   ├── app.js          # Express app setup
│   │   └── index.js        # Server entry point
│   ├── migrations/         # Database migrations
│   ├── package.json
│   └── .env                # Environment variables
├── docs/                    # Product documentation
│   ├── PRD.md              # Product Requirements
│   ├── USER_STORIES.md     # User stories with acceptance criteria
│   └── TDD.md              # Technical Design Document
├── docker-compose.yml       # PostgreSQL setup
├── package.json             # Root package file
└── README.md                # This file
```

## Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development mode
- `npm run db:up` - Start PostgreSQL database
- `npm run db:down` - Stop PostgreSQL database
- `npm run db:reset` - Reset database (deletes all data!)
- `npm run migrate:up` - Run database migrations
- `npm run migrate:down` - Rollback database migrations
- `npm test` - Run all tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Server (cd server)

- `npm run dev` - Start backend in watch mode
- `npm start` - Start backend in production mode
- `npm test` - Run backend tests

### Client (cd client)

- `npm run dev` - Start frontend dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run frontend tests

## API Endpoints

All API endpoints are prefixed with `/api`

### Entries

- `GET /api/entries` - List all entries (newest first)
- `GET /api/entries/:id` - Get a single entry
- `POST /api/entries` - Create a new entry
- `PUT /api/entries/:id` - Update an entry
- `DELETE /api/entries/:id` - Delete an entry

### Request/Response Examples

**Create Entry:**
```bash
POST /api/entries
Content-Type: application/json

{
  "title": "My first Python script",
  "content": "Learned how to use the print() function..."
}
```

**Response:**
```json
{
  "entry": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My first Python script",
    "content": "Learned how to use the print() function...",
    "created_at": "2025-11-20T10:30:00.000Z",
    "updated_at": "2025-11-20T10:30:00.000Z"
  }
}
```

## Database Management

### View Database

```bash
# Connect to PostgreSQL
docker exec -it codejournal-db psql -U codejournal -d codejournal_dev

# Useful SQL commands:
# \dt              - List tables
# \d entries       - Describe entries table
# SELECT * FROM entries;  - View all entries
# \q               - Quit
```

### Backup Database

```bash
docker exec codejournal-db pg_dump -U codejournal codejournal_dev > backup.sql
```

### Restore Database

```bash
cat backup.sql | docker exec -i codejournal-db psql -U codejournal -d codejournal_dev
```

## Development Workflow

### Creating a New Feature

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test your changes: `npm test`
4. Lint your code: `npm run lint`
5. Format your code: `npm run format`
6. Commit with descriptive message
7. Create a Pull Request

### Testing

Code Journal has a comprehensive test suite covering backend and frontend functionality.

```bash
# Run all tests (backend + frontend)
npm test

# Run backend tests only
cd server && npm test

# Run backend tests with coverage
cd server && npm test -- --coverage

# Run frontend tests only
cd client && npm test

# Run frontend tests with UI
cd client && npm run test:ui

# Run tests in watch mode
cd server && npm run test:watch
```

**Test Coverage:**
- Backend: 80%+ (unit + integration tests)
- Frontend: 60%+ (component + page tests)

**What's Tested:**
- All CRUD operations
- API endpoints with validation
- Form validation and error handling
- User interactions
- Loading and error states
- Accessibility features

📖 **For detailed testing documentation, see [TESTING.md](TESTING.md)**

## Troubleshooting

### Database Connection Issues

**Problem:** Can't connect to database

**Solutions:**
```bash
# Check if PostgreSQL is running
docker ps

# Start the database
npm run db:up

# Check database logs
docker logs codejournal-db

# Restart database
npm run db:reset
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port in server/.env
PORT=3001
```

### Migration Errors

**Problem:** Migration fails to run

**Solutions:**
```bash
# Check database connection
docker exec codejournal-db pg_isready -U codejournal

# View migration status
cd server && npx node-pg-migrate list

# Rollback and retry
npm run migrate:down
npm run migrate:up
```

## Security Considerations

⚠️ **IMPORTANT:** Phase 1 has NO authentication. Do not deploy publicly without adding authentication!

**Current Limitations:**
- No user authentication or authorization
- No rate limiting
- Anyone with the URL can access all entries

**For Local Development Only:**
- Fine for personal use on localhost
- Do NOT expose to the internet

**Future Phases:**
- Phase 4 will add user authentication
- Use basic HTTP auth via reverse proxy if you need to deploy now

## Performance Targets

- ✅ Initial page load: <2 seconds
- ✅ Entry list with 100 entries: <1 second
- ✅ API response time: <200ms (GET), <500ms (POST/PUT/DELETE)
- ✅ Entry creation: <2 seconds end-to-end

## Browser Support

- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Mobile Chrome/Safari ✓

## Accessibility

- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Screen reader compatible
- High contrast mode support
- Dark mode support (system preference)

## Tech Stack

### Frontend
- React 18.2
- React Router 6.20
- Vite 5.0
- CSS Modules

### Backend
- Node.js 20+
- Express 4.18
- PostgreSQL 15
- node-postgres (pg)

### Development Tools
- ESLint + Prettier
- Jest + Vitest
- Docker Compose

## Contributing

This is a learning project following spec-driven development. Contributions welcome!

1. Read the [Product Requirements Document](docs/PRD.md)
2. Review [User Stories](docs/USER_STORIES.md)
3. Check [Technical Design Document](docs/TDD.md)
4. Follow the development workflow above

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
1. Check this README
2. Review documentation in `/docs`
3. Check troubleshooting section above
4. Open an issue on GitHub

## Roadmap

- ✅ **Phase 1 (MVP):** Core CRUD functionality
- ⬜ **Phase 2:** Search and tags
- ⬜ **Phase 3:** Syntax highlighting and rich text
- ⬜ **Phase 4:** Multi-device sync and authentication

---

**Current Status:** Phase 1 (MVP) - Ready for local development and testing

Built with ❤️ for beginner developers learning to code
