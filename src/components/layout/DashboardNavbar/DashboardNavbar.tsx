import Link from 'next/link';
import styles from './DashboardNavbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { useContext } from 'react';
import UserContext from '@/store/user-context';
import { Project } from '@/types/types';

export const DashboardNavbar = () => {
  const context = useContext(UserContext);

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
            {context.projects.length > 0 &&
              context.projects.map((project: Project) => (
                <Link href={`/kreator/${project.id}`} key={project.id}>
                  {project.name}
                </Link>
              ))}
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
