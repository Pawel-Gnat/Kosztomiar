import { Login, Register } from '@/types/types';
import styles from './authForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginFormSchema, RegisterFormSchema } from '@/schemas/AuthFormSchema';

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
    resolver: zodResolver(RegisterFormSchema()),
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

      <Button type="submit" content="Załóż konto" isSmall={true} accent={false} />
    </form>
  );
};
