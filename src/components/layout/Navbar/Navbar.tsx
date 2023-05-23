import Link from 'next/link';
import styles from './Navbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';

export default function Navbar() {
  return (
    <header>
      <nav className={styles.nav}>
        <div>
          <Link href="/" className={stylesLink.navlink}>
            Kosztomiar
          </Link>
        </div>
        <div>
          <Link href="/kreator" className={stylesLink.navlink}>
            Kreator
          </Link>
          <Link href="/login" className={stylesLink.navlink}>
            Zaloguj się
          </Link>
        </div>
      </nav>
    </header>
  );
}
