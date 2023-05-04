import { ReactNode } from 'react';
import styles from './DashBoardLayout.module.css';
import { DashboardNavbar } from '../DashboardNavbar/DashboardNavbar';

type Props = {
  children: ReactNode;
};

function DashBoardLayout(props: Props) {
  return (
    <div className={styles.dashboard}>
      <DashboardNavbar />
      <main>{props.children}</main>
    </div>
  );
}

export default DashBoardLayout;
