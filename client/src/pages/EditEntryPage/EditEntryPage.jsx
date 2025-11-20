import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { entriesAPI } from '../../api/client';
import EntryForm from '../../components/EntryForm/EntryForm';
import styles from './EditEntryPage.module.css';

function EditEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    loadEntry();
  }, [id]);

  async function loadEntry() {
    try {
      setLoading(true);
      setError(null);
      const data = await entriesAPI.getById(id);
      setEntry(data.entry);
    } catch (err) {
      if (err.code === 'NOT_FOUND') {
        setError('Entry not found');
      } else {
        setError('Failed to load entry. Please try again.');
      }
      console.error('Error loading entry:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      setSubmitting(true);
      setSubmitError(null);
      const data = await entriesAPI.update(id, formData);
      navigate(`/entries/${data.entry.id}`, { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Failed to update entry. Please try again.');
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading entry...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <Link to="/" className={styles.backLink}>
            Back to All Entries
          </Link>
        </div>
      </div>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/entries/${id}`} className={styles.backLink}>
          ← Back to Entry
        </Link>
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Edit Entry</h1>

        {submitError && (
          <div className={styles.error} role="alert">
            {submitError}
          </div>
        )}

        <EntryForm
          initialData={{
            title: entry.title,
            content: entry.content,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/entries/${id}`)}
          submitText="Save Changes"
          isSubmitting={submitting}
        />
      </div>
    </div>
  );
}

export default EditEntryPage;
