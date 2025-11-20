# Testing Guide

Comprehensive testing documentation for Code Journal.

## Overview

Code Journal uses a robust testing strategy with:
- **Backend:** Jest for unit and integration tests
- **Frontend:** Vitest and React Testing Library for component tests
- **Target Coverage:** 80%+ backend, 60%+ frontend

## Table of Contents

1. [Running Tests](#running-tests)
2. [Backend Testing](#backend-testing)
3. [Frontend Testing](#frontend-testing)
4. [Writing Tests](#writing-tests)
5. [Best Practices](#best-practices)
6. [CI/CD Integration](#cicd-integration)

---

## Running Tests

### Run All Tests

```bash
# From project root
npm test
```

### Backend Tests Only

```bash
cd server
npm test

# With coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

### Frontend Tests Only

```bash
cd client
npm test

# With UI
npm run test:ui

# Watch mode
npm test -- --watch
```

### Quick Test Commands

```bash
# Run all tests with coverage
npm test

# Run specific test file
cd server && npm test -- entryRepository.test.js

# Run tests matching pattern
cd client && npm test -- EntryForm
```

---

## Backend Testing

### Test Structure

```
server/src/__tests__/
├── helpers/
│   └── testDb.js           # Test database utilities
├── repositories/
│   └── entryRepository.test.js   # Repository unit tests
└── integration/
    └── entries.test.js     # API integration tests
```

### Test Database Setup

**Important:** Tests use a separate test database (`codejournal_test`) to avoid affecting development data.

#### Create Test Database

```bash
# Connect to PostgreSQL
docker exec -it codejournal-db psql -U codejournal -d postgres

# Create test database
CREATE DATABASE codejournal_test;
\q
```

The test suite automatically creates tables and runs migrations for each test run.

### Running Backend Tests

```bash
cd server

# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test suite
npm test -- repositories

# Run in watch mode
npm run test:watch

# Run with verbose output
npm test -- --verbose
```

### Backend Test Coverage

Current test coverage includes:

**Unit Tests:**
- ✅ EntryRepository (CRUD operations)
  - Create entries with UUIDs and timestamps
  - Find all entries (ordered)
  - Find by ID
  - Update entries
  - Delete entries

**Integration Tests:**
- ✅ POST /api/entries - Create entry
- ✅ GET /api/entries - List all entries
- ✅ GET /api/entries/:id - Get single entry
- ✅ PUT /api/entries/:id - Update entry
- ✅ DELETE /api/entries/:id - Delete entry
- ✅ Validation errors (400)
- ✅ Not found errors (404)
- ✅ Special character handling

### Backend Test Examples

**Repository Test:**
```javascript
it('should create a new entry with auto-generated UUID', async () => {
  const entry = await repository.create({
    title: 'Test Entry',
    content: 'Test content',
  });

  expect(entry.id).toBeDefined();
  expect(entry.title).toBe('Test Entry');
  expect(entry.created_at).toBeDefined();
});
```

**API Integration Test:**
```javascript
it('should return 400 when title is missing', async () => {
  const response = await request(app)
    .post('/api/entries')
    .send({ content: 'Test content' });

  expect(response.status).toBe(400);
  expect(response.body.error.code).toBe('VALIDATION_ERROR');
});
```

---

## Frontend Testing

### Test Structure

```
client/src/
├── components/
│   ├── EntryForm/
│   │   ├── EntryForm.jsx
│   │   └── EntryForm.test.jsx
│   └── ConfirmationModal/
│       └── ConfirmationModal.test.jsx (to be added)
├── pages/
│   └── EntryListPage/
│       ├── EntryListPage.jsx
│       └── EntryListPage.test.jsx
└── test/
    └── setup.js              # Global test configuration
```

### Running Frontend Tests

```bash
cd client

# Run all tests
npm test

# Run with UI (interactive)
npm run test:ui

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- EntryForm
```

### Frontend Test Coverage

Current test coverage includes:

**EntryForm Component:**
- ✅ Rendering with initial data
- ✅ Form validation (empty fields, length limits)
- ✅ Error message display
- ✅ Form submission with trimmed data
- ✅ Cancel functionality
- ✅ Disabled state when submitting
- ✅ Accessibility (ARIA attributes)
- ✅ Keyboard shortcut hints

**EntryListPage:**
- ✅ Loading state
- ✅ Empty state display
- ✅ Entry list rendering
- ✅ Entry count display
- ✅ Date formatting
- ✅ Links to entry details
- ✅ Error handling and retry

### Frontend Test Examples

**Component Test:**
```javascript
it('should show error when title is empty', async () => {
  render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

  const submitButton = screen.getByRole('button', { name: /save/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getByText(/please add a title/i)
    ).toBeInTheDocument();
  });
});
```

**Page Test with Mocked API:**
```javascript
it('should display entries when they exist', async () => {
  entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

  renderWithRouter(<EntryListPage />);

  await waitFor(() => {
    expect(screen.getByText('First Entry')).toBeInTheDocument();
  });
});
```

---

## Writing Tests

### Test File Naming

- Unit tests: `ComponentName.test.jsx` or `fileName.test.js`
- Place test file next to the component/module it tests
- Integration tests: In `__tests__/integration/` directory

### Test Structure

Use the AAA pattern (Arrange, Act, Assert):

```javascript
it('should do something specific', async () => {
  // Arrange - Set up test data and mocks
  const mockData = { title: 'Test', content: 'Content' };

  // Act - Execute the code being tested
  const result = await someFunction(mockData);

  // Assert - Verify the expected outcome
  expect(result).toBeDefined();
  expect(result.title).toBe('Test');
});
```

### Backend Test Template

```javascript
import { setupTestDb, cleanupTestDb, closeTestDb } from '../helpers/testDb.js';

describe('Feature Name', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  beforeEach(async () => {
    await cleanupTestDb(); // Clean data between tests
  });

  afterAll(async () => {
    await closeTestDb();
  });

  describe('specific functionality', () => {
    it('should behave as expected', async () => {
      // Test implementation
    });
  });
});
```

### Frontend Test Template

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <ComponentName />
      </BrowserRouter>
    );

    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

---

## Best Practices

### General

1. **Write tests first (TDD)** when adding new features
2. **Test behavior, not implementation** - Focus on what users see/do
3. **One assertion concept per test** - Keep tests focused
4. **Use descriptive test names** - "should do X when Y happens"
5. **Isolate tests** - Each test should be independent

### Backend Testing

1. **Clean database between tests** - Use `cleanupTestDb()`
2. **Test error cases** - Validate error handling (400, 404, 500)
3. **Test edge cases** - Empty strings, very long strings, special characters
4. **Use real database** - Don't mock the database for integration tests
5. **Test validation** - Ensure business rules are enforced

### Frontend Testing

1. **Query by accessibility role** - Use `getByRole` when possible
2. **Avoid testing implementation details** - Don't test state directly
3. **Mock external dependencies** - Mock API calls
4. **Test user interactions** - Use `userEvent` over `fireEvent`
5. **Wait for async updates** - Use `waitFor` for async state changes

### Accessibility Testing

1. **Use semantic queries** - `getByRole`, `getByLabelText`
2. **Test ARIA attributes** - Verify `aria-invalid`, `aria-describedby`
3. **Test keyboard navigation** - Ensure interactive elements are accessible
4. **Test form labels** - All inputs should have associated labels

---

## Coverage Goals

### Current Coverage

```bash
# Check backend coverage
cd server && npm test -- --coverage

# Check frontend coverage
cd client && npm test -- --coverage
```

### Target Coverage

- **Backend:** 80%+ (statements, branches, functions)
- **Frontend:** 60%+ (statements, branches, functions)
- **Critical paths:** 100% (user authentication, data persistence)

### What to Cover

**Must Cover:**
- All CRUD operations
- Form validation
- Error handling
- API endpoints
- User-facing features

**Nice to Cover:**
- Edge cases
- Error messages
- Loading states
- Empty states

**Can Skip:**
- Pure presentational components with no logic
- Third-party library code
- Configuration files

---

## CI/CD Integration

### GitHub Actions (To Be Added)

Tests automatically run on:
- Every pull request
- Every push to main branch
- Before deployment

Example workflow:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: codejournal_test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd server && npm install
      - run: cd server && npm test -- --coverage

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd client && npm install
      - run: cd client && npm test -- --coverage
```

---

## Troubleshooting

### Backend Tests Failing

**Problem:** Tests hang or timeout

**Solution:**
```bash
# Ensure test database exists
docker exec -it codejournal-db psql -U codejournal -d postgres -c "CREATE DATABASE IF NOT EXISTS codejournal_test;"

# Check database connection
docker exec -it codejournal-db psql -U codejournal -d codejournal_test -c "SELECT NOW();"
```

**Problem:** "Database connection failed"

**Solution:**
```bash
# Restart PostgreSQL
npm run db:down
npm run db:up
```

### Frontend Tests Failing

**Problem:** "Cannot find module"

**Solution:**
```bash
cd client
rm -rf node_modules
npm install
```

**Problem:** Tests pass locally but fail in CI

**Solution:**
- Check Node.js version matches (v20+)
- Ensure all dependencies are in `package.json`
- Check for timing issues (increase timeouts)

---

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Test Checklist

Before submitting a PR:

- [ ] All tests pass (`npm test`)
- [ ] Coverage meets targets (80% backend, 60% frontend)
- [ ] New features have tests
- [ ] Tests are descriptive and meaningful
- [ ] No commented-out or skipped tests
- [ ] Tests run in under 30 seconds (total)
- [ ] No console errors or warnings

---

**Last Updated:** 2025-11-20
**Test Framework:** Jest (Backend), Vitest (Frontend)
**Coverage Tool:** Jest Coverage, Vitest Coverage
