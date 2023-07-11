import styles from './InitialView.module.css';
import { DashboardImage } from '@/assets/svg/DashboardImage';
import { H1 } from '@/components/ui/Text/Text';

export const InitialView = () => {
  return (
    <div className={styles.container}>
      <H1 content="Rozpocznij pracę z Kosztomiarem" />
      <DashboardImage />
    </div>
  );
};
