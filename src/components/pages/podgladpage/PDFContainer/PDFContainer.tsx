import styles from './PDFContainer.module.css';
import { FC, ReactNode } from 'react';

export const PDFContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
