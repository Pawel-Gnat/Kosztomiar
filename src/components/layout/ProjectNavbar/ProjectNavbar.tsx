import Link from 'next/link';
import styles from './ProjectNavbar.module.css';

export const ProjectNavbar = (props: { name: string; id: string }) => {
  return (
    <nav className={styles.nav}>
      <p>{props.name}</p>
      <div>
        <Link href={`/kreator/${props.id}`}>Dane</Link>
        <Link href={`/kreator/${props.id}/ustawienia`}>Ustawienia</Link>
        <Link href={`/kreator/${props.id}/podglad`}>Podgląd</Link>
      </div>
    </nav>
  );
};
