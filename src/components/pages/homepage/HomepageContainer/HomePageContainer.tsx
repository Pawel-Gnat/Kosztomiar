import Navbar from '@/components/pages/homepage/Navbar/Navbar';
import styles from './HomePageContainer.module.css';
import { Footer } from '../Footer/Footer';

export const HomePageContainer = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.waves}></div>
      <Navbar />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </>
  );
};
