// import styles from './DashboardLayout.module.css';
import { ReactNode } from 'react';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';

type Props = {
  children: ReactNode;
};

function DashboardLayout(props: Props) {
  return (
    // <div className={styles.dashboard}>
    <div>
      <DashboardNavbar />
      {/* <main className={styles.main}>{props.children}</main> */}
      <main>{props.children}</main>
    </div>
  );
}

export default DashboardLayout;
