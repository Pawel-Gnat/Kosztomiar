import styles from './ProjectNavbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import Link from 'next/link';
import { Text } from '@/components/ui/Text/Text';
import { FiDatabase, FiSettings, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/router';

export const ProjectNavbar = (props: { name: string; id: string }) => {
  const router = useRouter();

  const activeLink = `${stylesLink.active} ${stylesLink.navlink} ${stylesLink['project-navbar-link']}`;
  const nonActiveLink = `${stylesLink.navlink} ${stylesLink['project-navbar-link']}`;

  function handleActiveLink(linkName: string) {
    const currentPageName = router.pathname.replace(
      /^\/kreator\/\[projektid\](\/)?/,
      '/',
    );

    return currentPageName === linkName ? activeLink : nonActiveLink;
  }

  return (
    <nav className={styles.nav}>
      <Text content={props.name} />
      <div>
        <Link className={handleActiveLink('/')} href={`/kreator/${props.id}`}>
          <FiDatabase />
          Dane
        </Link>
        <Link
          className={handleActiveLink('/ustawienia')}
          href={`/kreator/${props.id}/ustawienia`}
        >
          <FiSettings />
          Ustawienia
        </Link>
        <Link
          className={handleActiveLink('/podglad')}
          href={`/kreator/${props.id}/podglad`}
        >
          <FiEye />
          Podgląd
        </Link>
      </div>
    </nav>
  );
};
