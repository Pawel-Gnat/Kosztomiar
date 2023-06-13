import Link from 'next/link';
import styles from './Footer.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { Logo } from '@/assets/svg/Logo';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="/" className={stylesLink.logo}>
          <Logo />
        </Link>
        <Link href="/kreator" className={stylesLink.footerlink}>
          Kreator
        </Link>
        <Link href="/login" className={stylesLink.footerlink}>
          Zaloguj się
        </Link>
        <Link href="/polityka" className={stylesLink.footerlink}>
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
};
