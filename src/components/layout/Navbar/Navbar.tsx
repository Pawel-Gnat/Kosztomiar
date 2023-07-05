import Link from 'next/link';
import styles from './Navbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { Logo } from '@/assets/svg/Logo';
import { Text } from '@/components/ui/Text/Text';
import { useSession } from 'next-auth/react';
import { FiLogIn } from 'react-icons/fi';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
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

          {session ? (
            <Link href="/kreator/profil" className={stylesLink.navlink}>
              Twój profil
            </Link>
          ) : (
            <Link href="/login" className={stylesLink.navlink}>
              <FiLogIn />
              Zaloguj się
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
