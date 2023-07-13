import { useState } from 'react';
import styles from './LoginFormContainer.module.css';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { LoginForm, RegisterForm } from '../AuthUserForm/AuthUserForm';
import { LoadingProvider } from '@/store/loading-context';
import { useNotification } from '@/hooks/useNotification';
import { Notification } from '@/components/ui/Notification/Notification';

export const LoginFormContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { notification, handleNotification } = useNotification();

  return (
    <LoadingProvider>
      <div className={`${styles.container} show`}>
        <h2 className={styles.heading}>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
        <Text content="Skorzystaj z możliwości jakie daje własne konto w aplikacji. Posiadaj dostęp do swoich danych gdziekolwiek jesteś!" />
        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} handleNotification={handleNotification} />
        )}
        <Button
          type="button"
          isSmall={true}
          accent={false}
          content={
            isLogin ? 'Nie masz konta? Zarejestruj się!' : 'Masz już konto? Zaloguj się!'
          }
          onClick={() => setIsLogin((prevState) => !prevState)}
        />
      </div>
      {notification.active && (
        <Notification message={notification.message} status={notification.status} />
      )}
    </LoadingProvider>
  );
};
