import { Login, Register } from '@/types/types';
import styles from './AuthUserForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginFormSchema, RegisterFormSchema } from '@/schemas/AuthFormSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loader } from '@/components/loader/Loader';
import { useContext } from 'react';
import { LoadingContext } from '@/store/loading-context';

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

  const submitHandler = async (formValues: FieldValues) => {
    setIsLoading(true);
    const { email, password } = formValues;
    const result = await signIn('credentials', { redirect: false, email, password });
    setIsLoading(false);
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

export const RegisterForm = () => {
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
    return data;
  }

  const submitHandler = async (formValues: FieldValues) => {
    try {
      setIsLoading(true);
      const result = await createUser(formValues as Register);
      setIsLoading(false);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        />
      ))}

      <Button
        type="submit"
        content={loading ? <Loader /> : 'Załóż konto'}
        isSmall={true}
        accent={false}
      />
    </form>
  );
};
