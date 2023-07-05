import { ReactNode } from 'react';
import styles from './LoginPageContainer.module.css';

type LoginPageContainerProps = {
  children: ReactNode;
};

export const LoginPageContainer: React.FC<LoginPageContainerProps> = ({ children }) => {
  return (
    <section className={styles.section}>
      <div>{children}</div>
    </section>
  );
};
