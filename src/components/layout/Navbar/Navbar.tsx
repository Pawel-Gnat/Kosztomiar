import Link from 'next/link';
import styles from './Navbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { Logo } from '@/assets/Logo/Logo';
import { Text } from '@/components/ui/Text/Text';

export default function Navbar() {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={stylesLink['logo-container']}>
          <Link href="/" className={stylesLink.logo}>
            <Logo />
            <Text content="Kosztomiar" />
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
