import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { entriesAPI } from '../../api/client';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import ContentDisplay from '../../components/ContentDisplay/ContentDisplay';
import styles from './EntryDetailPage.module.css';

function EntryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  async function handleDelete() {
    try {
      setDeleting(true);
      await entriesAPI.delete(id);
      navigate('/', { replace: true });
    } catch (err) {
      alert('Failed to delete entry. Please try again.');
      console.error('Error deleting entry:', err);
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        <Link to="/" className={styles.backLink}>
          ← Back to All Entries
        </Link>
      </div>

      <article className={styles.entry}>
        <h1 className={styles.title}>{entry.title}</h1>
        <p className={styles.date}>Created on {formatDate(entry.created_at)}</p>

        <ContentDisplay content={entry.content} />

        <div className={styles.actions}>
          <Link to={`/entries/${id}/edit`} className={styles.editButton}>
            Edit Entry
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={styles.deleteButton}
          >
            Delete Entry
          </button>
        </div>
      </article>

      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Entry"
          message="Are you sure you want to delete this entry? This cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={deleting}
          isDangerous={true}
        />
      )}
    </div>
  );
}

export default EntryDetailPage;
