import Navbar from '@/components/layout/Navbar/Navbar';
import styles from './HomePageContainer.module.css';

export const HomePageContainer = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.waves}></div>
      <Navbar />
      <main className={styles.main}>{props.children}</main>;
    </>
  );
};
