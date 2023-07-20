import styles from './ProjectList.module.css';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import stylesLink from '../../../ui/Link/Link.module.css';
import Link from 'next/link';
import { FC } from 'react';

export const ProjectList: FC<{ projects: Project[] }> = ({ projects }) => {
  const router = useRouter();

  return (
    <ul className={styles['list-container']}>
      {projects.map((project: Project) => (
        <li key={project.id} className={styles.list}>
          <Link
            href={`/kreator/${project.id}`}
            className={router.query.projektid === project.id ? stylesLink.active : ''}
          >
            {project.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
