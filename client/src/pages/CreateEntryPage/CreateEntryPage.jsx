import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { entriesAPI } from '../../api/client';
import EntryForm from '../../components/EntryForm/EntryForm';
import styles from './CreateEntryPage.module.css';

function CreateEntryPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    try {
      setSubmitting(true);
      setError(null);
      const data = await entriesAPI.create(formData);
      navigate(`/entries/${data.entry.id}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create entry. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to All Entries
        </Link>
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create New Entry</h1>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        <EntryForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
          submitText="Save Entry"
          isSubmitting={submitting}
        />
      </div>
    </div>
  );
}

export default CreateEntryPage;
