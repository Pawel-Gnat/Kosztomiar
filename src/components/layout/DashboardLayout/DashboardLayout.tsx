import styles from './DashBoardLayout.module.css';
import { FC, ReactNode } from 'react';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';
import { NotificationProvider } from '@/store/notification-context';

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`${styles.dashboard} show`}>
      <DashboardNavbar />
      <NotificationProvider>
        <main className={styles.main}>{children}</main>
      </NotificationProvider>
    </div>
  );
};
