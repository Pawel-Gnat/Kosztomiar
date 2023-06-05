import Link from 'next/link';
import styles from './DashboardNavbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { useContext } from 'react';
import UserContext from '@/store/user-context';
import { Project } from '@/types/types';
import { FiLogIn, FiFolder, FiPlusSquare } from 'react-icons/fi';
import { Text } from '@/components/ui/Text/Text';
import { Logo } from '@/assets/Logo/Logo';
import { useRouter } from 'next/router';

export const DashboardNavbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/" className={stylesLink.logo}>
              <Logo />
              <Text content="Kosztomiar" />
            </Link>
          </div>

          <div className={styles.projects}>
            <div>
              <FiFolder className={styles.icon} />
              <Text content="Projekty" />
            </div>
            {context.projects.length > 0 && (
              <ul className={styles['list-container']}>
                {context.projects.map((project: Project) => (
                  <li key={project.id} className={styles.list}>
                    <Link
                      href={`/kreator/${project.id}`}
                      className={
                        router.query.projektid === project.id ? stylesLink.active : ''
                      }
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.buttons}>
            <Link
              href="/kreator/nowy-projekt"
              className={`${stylesLink.accent} ${stylesLink.navlink}`}
            >
              <FiPlusSquare />
              Nowy projekt
            </Link>
            <Link href="/login" className={stylesLink.navlink}>
              <FiLogIn />
              Zaloguj się
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
