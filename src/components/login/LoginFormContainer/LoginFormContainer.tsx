import { useState } from 'react';
import styles from './LoginFormContainer.module.css';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { LoginForm, RegisterForm } from '../authForm/authForm';

export const LoginFormContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
      <Text content="Skorzystaj z możliwości jakie daje własne konto w aplikacji. Posiadaj dostęp do swoich danych gdziekolwiek jesteś!" />
      {isLogin ? <LoginForm /> : <RegisterForm />}
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
  );
};
