import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entriesAPI } from '../../api/client';
import styles from './EntryListPage.module.css';

function EntryListPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      setLoading(true);
      setError(null);
      const data = await entriesAPI.getAll();
      setEntries(data.entries);
    } catch (err) {
      setError('Failed to load entries. Please try again.');
      console.error('Error loading entries:', err);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading entries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={loadEntries} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>Start your learning journey</h2>
          <p>Create your first entry to begin building your technical knowledge base</p>
          <Link to="/entries/new" className={styles.emptyStateButton}>
            Create Your First Entry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>All Entries</h2>
        <p className={styles.count}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      <div className={styles.entryList}>
        {entries.map((entry) => (
          <Link
            key={entry.id}
            to={`/entries/${entry.id}`}
            className={styles.entryCard}
          >
            <h3 className={styles.entryTitle}>{entry.title}</h3>
            <p className={styles.entryDate}>{formatDate(entry.created_at)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EntryListPage;
