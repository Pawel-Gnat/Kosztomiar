import Link from 'next/link';
import styles from './Footer.module.css';
import stylesLink from '../../../ui/Link/Link.module.css';
import { Logo } from '@/assets/svg/Logo';
import { useSession } from 'next-auth/react';

export const Footer = () => {
  const { data: session, status } = useSession();

  return (
    <footer className={styles.footer} role="footer">
      <div>
        <Link href="/" className={stylesLink.logo}>
          <Logo />
        </Link>
        <Link href="/kreator" className={stylesLink.footerlink}>
          Kreator
        </Link>
        {session ? (
          <Link href="/kreator/profil" className={stylesLink.footerlink}>
            Twój profil
          </Link>
        ) : (
          <Link href="/login" className={stylesLink.footerlink}>
            Zaloguj się
          </Link>
        )}
      </div>
    </footer>
  );
};
