import styles from './DashBoardLayout.module.css';
import { FC, ReactNode } from 'react';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';
import { NotificationProvider } from '@/store/notification-context';
import { LoadingProvider } from '@/store/loading-context';

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`${styles.dashboard} show`} data-app="app">
      <DashboardNavbar />
      <NotificationProvider>
        <LoadingProvider>
          <main className={styles.main}>{children}</main>
        </LoadingProvider>
      </NotificationProvider>
    </div>
  );
};
