import { useEffect } from 'react';
import styles from './ConfirmationModal.module.css';

function ConfirmationModal({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Handle Escape key
    function handleEscape(e) {
      if (e.key === 'Escape' && !isLoading) {
        onCancel();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isLoading, onCancel]);

  return (
    <div className={styles.overlay} onClick={isLoading ? undefined : onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={
              isDangerous ? styles.dangerButton : styles.confirmButton
            }
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
