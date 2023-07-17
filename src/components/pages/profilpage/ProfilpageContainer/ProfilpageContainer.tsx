import { ReactNode } from 'react';
import styles from './ProfilpageContainer.module.css';

type ProfilpageContainerProps = {
  children: ReactNode;
};

export const ProfilpageContainer: React.FC<ProfilpageContainerProps> = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};
