import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EntryListPage from './EntryListPage';
import { entriesAPI } from '../../api/client';

// Mock the API client
vi.mock('../../api/client', () => ({
  entriesAPI: {
    getAll: vi.fn(),
  },
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('EntryListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading message while fetching entries', () => {
      entriesAPI.getAll.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      renderWithRouter(<EntryListPage />);

      expect(screen.getByText(/loading entries/i)).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no entries exist', async () => {
      entriesAPI.getAll.mockResolvedValue({ entries: [] });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/start your learning journey/i)
        ).toBeInTheDocument();
      });

      expect(
        screen.getByText(/create your first entry/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /create your first entry/i })
      ).toHaveAttribute('href', '/entries/new');
    });
  });

  describe('Entries Display', () => {
    it('should display entries when they exist', async () => {
      const mockEntries = [
        {
          id: '1',
          title: 'First Entry',
          content: 'Content 1',
          created_at: '2025-11-20T10:00:00.000Z',
        },
        {
          id: '2',
          title: 'Second Entry',
          content: 'Content 2',
          created_at: '2025-11-19T10:00:00.000Z',
        },
      ];

      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(screen.getByText('First Entry')).toBeInTheDocument();
      });

      expect(screen.getByText('Second Entry')).toBeInTheDocument();
    });

    it('should display entry count', async () => {
      const mockEntries = [
        {
          id: '1',
          title: 'Entry 1',
          content: 'Content 1',
          created_at: '2025-11-20T10:00:00.000Z',
        },
        {
          id: '2',
          title: 'Entry 2',
          content: 'Content 2',
          created_at: '2025-11-19T10:00:00.000Z',
        },
      ];

      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(screen.getByText(/2 entries/i)).toBeInTheDocument();
      });
    });

    it('should display singular "entry" when only one exists', async () => {
      const mockEntries = [
        {
          id: '1',
          title: 'Single Entry',
          content: 'Content',
          created_at: '2025-11-20T10:00:00.000Z',
        },
      ];

      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(screen.getByText(/1 entry/i)).toBeInTheDocument();
      });
    });

    it('should format dates correctly', async () => {
      const mockEntries = [
        {
          id: '1',
          title: 'Test Entry',
          content: 'Content',
          created_at: '2025-11-20T10:30:00.000Z',
        },
      ];

      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(screen.getByText(/nov 20, 2025/i)).toBeInTheDocument();
      });
    });

    it('should link to entry detail pages', async () => {
      const mockEntries = [
        {
          id: 'entry-123',
          title: 'Test Entry',
          content: 'Content',
          created_at: '2025-11-20T10:00:00.000Z',
        },
      ];

      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        const link = screen.getByRole('link', { name: /test entry/i });
        expect(link).toHaveAttribute('href', '/entries/entry-123');
      });
    });
  });

  describe('Error State', () => {
    it('should show error message when API call fails', async () => {
      entriesAPI.getAll.mockRejectedValue(new Error('API Error'));

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/failed to load entries/i)
        ).toBeInTheDocument();
      });
    });

    it('should show retry button on error', async () => {
      entriesAPI.getAll.mockRejectedValue(new Error('API Error'));

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /try again/i })
        ).toBeInTheDocument();
      });
    });

    it('should retry loading when retry button is clicked', async () => {
      // First call fails
      entriesAPI.getAll.mockRejectedValueOnce(new Error('API Error'));

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/failed to load entries/i)
        ).toBeInTheDocument();
      });

      // Second call succeeds
      const mockEntries = [
        {
          id: '1',
          title: 'Test Entry',
          content: 'Content',
          created_at: '2025-11-20T10:00:00.000Z',
        },
      ];
      entriesAPI.getAll.mockResolvedValue({ entries: mockEntries });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      retryButton.click();

      await waitFor(() => {
        expect(screen.getByText('Test Entry')).toBeInTheDocument();
      });
    });
  });

  describe('Header', () => {
    it('should display page heading', async () => {
      entriesAPI.getAll.mockResolvedValue({ entries: [] });

      renderWithRouter(<EntryListPage />);

      await waitFor(() => {
        expect(screen.getByText(/start your learning journey/i)).toBeInTheDocument();
      });
    });
  });
});
