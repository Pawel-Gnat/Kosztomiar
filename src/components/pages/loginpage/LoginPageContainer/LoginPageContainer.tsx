import { FC, ReactNode } from 'react';
import styles from './LoginPageContainer.module.css';

export const LoginPageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className={styles.section}>
      <div>{children}</div>
    </section>
  );
};
