import { useState, useEffect, useRef } from 'react';
import styles from './EntryForm.module.css';

function EntryForm({
  initialData = { title: '', content: '' },
  onSubmit,
  onCancel,
  submitText = 'Save',
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    // Auto-focus title field on mount
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Warn about unsaved changes
    function handleBeforeUnload(e) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to submit
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length === 0) {
      newErrors.title = 'Please add a title to your entry';
    } else if (formData.title.trim().length > 255) {
      newErrors.title = 'Title must be 255 characters or less';
    }

    if (!formData.content || formData.content.trim().length === 0) {
      newErrors.content = 'Please add some content to your entry';
    } else if (formData.content.trim().length > 50000) {
      newErrors.content = 'Content must be 50,000 characters or less';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      content: formData.content.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title <span className={styles.required}>*</span>
        </label>
        <input
          ref={titleInputRef}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="e.g., My first Python script"
          disabled={isSubmitting}
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className={styles.errorMessage} role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Content <span className={styles.required}>*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.content ? styles.inputError : ''}`}
          placeholder="What did you learn today?"
          rows={12}
          disabled={isSubmitting}
          aria-invalid={errors.content ? 'true' : 'false'}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && (
          <p id="content-error" className={styles.errorMessage} role="alert">
            {errors.content}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitText}
        </button>
      </div>

      <div className={styles.hints}>
        <p className={styles.hint}>
          <strong>💡 Tips:</strong>
        </p>
        <ul className={styles.hintList}>
          <li>Press Ctrl+Enter (or Cmd+Enter on Mac) to save quickly</li>
          <li>
            Add code blocks with syntax highlighting:{' '}
            <code className={styles.inlineCode}>```javascript</code>
            <br />
            <code className={styles.inlineCode}>your code here</code>
            <br />
            <code className={styles.inlineCode}>```</code>
          </li>
          <li>
            Supported languages: javascript, typescript, python, java, css,
            json, bash, sql, and more
          </li>
        </ul>
      </div>
    </form>
  );
}

export default EntryForm;
