import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntryForm from './EntryForm';

describe('EntryForm', () => {
  let mockOnSubmit;
  let mockOnCancel;

  beforeEach(() => {
    mockOnSubmit = vi.fn();
    mockOnCancel = vi.fn();
  });

  describe('Rendering', () => {
    it('should render form with all fields', () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /cancel/i })
      ).toBeInTheDocument();
    });

    it('should render with initial data when provided', () => {
      const initialData = {
        title: 'Test Title',
        content: 'Test Content',
      };

      render(
        <EntryForm
          initialData={initialData}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByLabelText(/title/i)).toHaveValue('Test Title');
      expect(screen.getByLabelText(/content/i)).toHaveValue('Test Content');
    });

    it('should render custom submit button text', () => {
      render(
        <EntryForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          submitText="Update Entry"
        />
      );

      expect(
        screen.getByRole('button', { name: /update entry/i })
      ).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show error when title is empty', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please add a title to your entry/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when content is empty', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'Test Title');

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please add some content to your entry/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when title exceeds 255 characters', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/title/i);
      const longTitle = 'a'.repeat(256);
      await userEvent.type(titleInput, longTitle);

      const contentInput = screen.getByLabelText(/content/i);
      await userEvent.type(contentInput, 'Test content');

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/title must be 255 characters or less/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should clear error when user starts typing in field with error', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      // Submit to trigger validation error
      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please add a title to your entry/i)
        ).toBeInTheDocument();
      });

      // Type in title field
      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'T');

      // Error should be cleared
      expect(
        screen.queryByText(/please add a title to your entry/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with trimmed data when valid', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/title/i);
      const contentInput = screen.getByLabelText(/content/i);

      await userEvent.type(titleInput, '  Test Title  ');
      await userEvent.type(contentInput, '  Test Content  ');

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Title',
          content: 'Test Content',
        });
      });
    });

    it('should not submit when validation fails', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please add a title to your entry/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should disable form fields when submitting', () => {
      render(
        <EntryForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          isSubmitting={true}
        />
      );

      expect(screen.getByLabelText(/title/i)).toBeDisabled();
      expect(screen.getByLabelText(/content/i)).toBeDisabled();
      expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    });

    it('should show "Saving..." text when submitting', () => {
      render(
        <EntryForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          isSubmitting={true}
        />
      );

      expect(screen.getByText(/saving\.\.\./i)).toBeInTheDocument();
    });
  });

  describe('Cancel Functionality', () => {
    it('should call onCancel when cancel button is clicked', () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should not call onCancel when cancel is disabled', () => {
      render(
        <EntryForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          isSubmitting={true}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeDisabled();

      fireEvent.click(cancelButton);
      expect(mockOnCancel).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/title/i);
      const contentInput = screen.getByLabelText(/content/i);

      expect(titleInput).toHaveAttribute('aria-invalid', 'false');
      expect(contentInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('should set aria-invalid to true when field has error', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const titleInput = screen.getByLabelText(/title/i);
        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should associate error messages with fields using aria-describedby', async () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const titleInput = screen.getByLabelText(/title/i);
        expect(titleInput).toHaveAttribute('aria-describedby', 'title-error');
      });
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('should have hint about keyboard shortcut', () => {
      render(<EntryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(
        screen.getByText(/press ctrl\+enter/i)
      ).toBeInTheDocument();
    });
  });
});
