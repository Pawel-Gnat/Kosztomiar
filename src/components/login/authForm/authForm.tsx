import { Login, Register } from '@/types/types';
import styles from './authForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginFormSchema } from '@/schemas/LoginFormSchema';

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

  const submitHandler = async (formValues: FieldValues) => {
    console.log(formValues);
    // reset();
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        type="email"
        content="Adres e-mail"
        name="email"
        error={errors.email}
        register={register}
      />
      <Input
        type="password"
        content="Hasło"
        name="password"
        error={errors.password}
        register={register}
      />
      <Button type="submit" content="Zaloguj się" isSmall={true} accent={false} />
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
    // resolver: zodResolver(LoginFormSchema()),
  });

  const submitHandler = async (formValues: FieldValues) => {
    console.log(formValues);
    // reset();
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        type="text"
        content="Twoje imię"
        name="name"
        error={errors.name}
        register={register}
      />
      <Input
        type="email"
        content="Adres e-mail"
        name="email"
        error={errors.email}
        register={register}
      />
      <Input
        type="password"
        content="Hasło"
        name="password"
        error={errors.password}
        register={register}
      />
      <Input
        type="password"
        content="Powtórz hasło"
        name="passwordValidation"
        error={errors.passwordValidation}
        register={register}
      />
      <Button type="submit" content="Załóż konto" isSmall={true} accent={false} />
    </form>
  );
};
