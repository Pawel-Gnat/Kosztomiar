import { ReactNode } from 'react';
import styles from './DashboardLayout.module.css';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';

type Props = {
  children: ReactNode;
};

function DashboardLayout(props: Props) {
  return (
    <div className={styles.dashboard}>
      <DashboardNavbar />
      <main>{props.children}</main>
    </div>
  );
}

export default DashboardLayout;
