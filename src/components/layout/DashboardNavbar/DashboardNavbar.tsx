import Link from 'next/link';
import styles from './DashboardNavbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';

export const DashboardNavbar = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div>
            <Link href="/" className={stylesLink.navlink}>
              Kosztomiar
            </Link>
          </div>

          <div>
            <p>Projekty</p>
          </div>

          <div>
            <Link href="/kreator/nowy-projekt" className={stylesLink.navlink}>
              Nowy projekt
            </Link>
            <Link href="/login" className={stylesLink.navlink}>
              Zaloguj się
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
