import styles from './ProjectNavbar.module.css';
import linkStyles from '../../ui/Link/Link.module.css';
import Link from 'next/link';
import { Text } from '@/components/ui/Text/Text';
import { FiDatabase, FiSettings, FiEye } from 'react-icons/fi';

export const ProjectNavbar = (props: { name: string; id: string }) => {
  return (
    <nav className={styles.nav}>
      <Text content={props.name} />
      <div>
        <Link
          className={`${linkStyles.navlink} ${linkStyles['project-navbar-link']}`}
          href={`/kreator/${props.id}`}
        >
          <FiDatabase />
          Dane
        </Link>
        <Link
          className={`${linkStyles.navlink} ${linkStyles['project-navbar-link']}`}
          href={`/kreator/${props.id}/ustawienia`}
        >
          <FiSettings />
          Ustawienia
        </Link>
        <Link
          className={`${linkStyles.navlink} ${linkStyles['project-navbar-link']}`}
          href={`/kreator/${props.id}/podglad`}
        >
          <FiEye />
          Podgląd
        </Link>
      </div>
    </nav>
  );
};
