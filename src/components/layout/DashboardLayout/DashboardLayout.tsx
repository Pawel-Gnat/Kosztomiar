import styles from './DashBoardLayout.module.css';
import { FC, ReactNode } from 'react';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`${styles.dashboard} show`}>
      <DashboardNavbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
