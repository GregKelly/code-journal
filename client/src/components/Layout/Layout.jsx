import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
              <h1>Code Journal</h1>
            </Link>
            <nav className={styles.nav}>
              <Link to="/entries/new" className={styles.newButton}>
                New Entry
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>
            Code Journal - Your personal learning companion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
