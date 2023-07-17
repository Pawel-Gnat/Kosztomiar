import { Login, Register, RegisterFormType, Response } from '@/types/types';
import styles from './AuthUserForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginFormSchema, RegisterFormSchema } from '@/schemas/AuthFormSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loader } from '@/components/loader/Loader';
import { FC, useContext, useState } from 'react';
import { LoadingContext } from '@/store/loading-context';
import { NotificationContext } from '@/store/notification-context';

const LOGIN_DEFAULT_VALUES = {
  email: '',
  password: '',
};

const REGISTER_DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordValidation: '',
};

const loginInputs = [
  { type: 'email', content: 'Adres e-mail' },
  { type: 'password', content: 'Hasło' },
];

const registerInputs = [
  { type: 'text', name: 'name', content: 'Twoje imię' },
  { type: 'email', name: 'email', content: 'Adres e-mail' },
  { type: 'password', name: 'password', content: 'Hasło' },
  { type: 'password', name: 'passwordValidation', content: 'Powtórz hasło' },
];

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: zodResolver(LoginFormSchema()),
  });
  const router = useRouter();
  const { loading, setIsLoading } = useContext(LoadingContext);
  const [authError, setAuthError] = useState<Response>({
    text: '',
    type: '',
  });

  const getAuthErrorType = (text: string) => {
    if (text === 'Użytkownik nie istnieje') {
      return 'email';
    }

    if (text === 'Niewłaściwe hasło') {
      return 'password';
    }

    throw new Error('Błąd typowania błędu z formularza');
  };

  const showAuthError = (text: string, type: string) => {
    setAuthError((prevState) => ({
      ...prevState,
      text: text,
      type: type,
    }));

    setTimeout(() => {
      setAuthError((prevState) => ({ ...prevState, text: '', type: '' }));
    }, 1500);
  };

  const submitHandler = async (formValues: FieldValues) => {
    setIsLoading(true);
    const { email, password } = formValues;
    const result = await signIn('credentials', { redirect: false, email, password });
    setIsLoading(false);

    if (result && result.error) {
      const errorType = getAuthErrorType(result.error);
      const errorText = result.error;
      showAuthError(errorText, errorType);
    }

    if (result && !result.error) {
      reset(LOGIN_DEFAULT_VALUES);
      router.replace('/kreator');
    }
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      {loginInputs.map((el) => (
        <Input
          key={el.type}
          type={el.type}
          content={el.content}
          name={el.type}
          error={errors[el.type as keyof typeof errors]}
          register={register}
          notificationError={authError}
        />
      ))}

      <Button
        type="submit"
        content={loading ? <Loader /> : 'Zaloguj się'}
        isSmall={true}
        accent={false}
      />
    </form>
  );
};

export const RegisterForm: FC<RegisterFormType> = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: REGISTER_DEFAULT_VALUES,
    resolver: zodResolver(RegisterFormSchema()),
  });
  const { loading, setIsLoading } = useContext(LoadingContext);
  const { handleNotification } = useContext(NotificationContext);
  const [authError, setAuthError] = useState<Response>({
    text: '',
    type: 'email',
  });

  const showAuthError = (text: string) => {
    setAuthError((prevState) => ({
      ...prevState,
      text: text,
    }));

    setTimeout(() => {
      setAuthError((prevState) => ({ ...prevState, text: '' }));
    }, 1500);
  };

  async function createUser(formData: Register) {
    const { name, email, password } = formData;

    const response = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message,
        },
      };
    }

    reset(REGISTER_DEFAULT_VALUES);
    handleNotification({ message: 'Konto zostało utworzone', status: 'success' });
    setIsLogin(true);
    return data;
  }

  const submitHandler = async (formValues: FieldValues) => {
    try {
      setIsLoading(true);
      const result = await createUser(formValues as Register);
      setIsLoading(false);

      if (result.error) {
        const errorText = result.error.message;
        showAuthError(errorText);
      }
    } catch (error) {
      throw new Error(`Błąd: ${error}`);
    }
  };

  return (
    <>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleSubmit(submitHandler)}
      >
        {registerInputs.map((el) => (
          <Input
            key={el.name}
            type={el.type}
            content={el.content}
            name={el.name}
            error={errors[el.name as keyof typeof errors]}
            register={register}
            notificationError={authError}
          />
        ))}

        <Button
          type="submit"
          content={loading ? <Loader /> : 'Załóż konto'}
          isSmall={true}
          accent={false}
        />
      </form>
    </>
  );
};
