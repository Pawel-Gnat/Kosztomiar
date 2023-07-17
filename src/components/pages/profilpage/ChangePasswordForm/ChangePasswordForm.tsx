import styles from './ChangePasswordForm.module.css';
import { LoadingContext } from '@/store/loading-context';
import { Button } from '@/components/ui/Button/Button';
import { Loader } from '@/components/loader/Loader';
import { useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Password, Response } from '@/types/types';
import { ChangePasswordFormSchema } from '@/schemas/ChangePasswordFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input/Input';
import { NotificationContext } from '@/store/notification-context';

const PASSWORD_DEFAULT_VALUES = {
  currentPassword: '',
  newPassword: '',
};

const passwordInputs = [
  { type: 'password', name: 'currentPassword', content: 'Obecne hasło' },
  { type: 'password', name: 'newPassword', content: 'Nowe hasło' },
];

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Password>({
    defaultValues: PASSWORD_DEFAULT_VALUES,
    resolver: zodResolver(ChangePasswordFormSchema()),
  });

  const { loading, setIsLoading } = useContext(LoadingContext);
  const { handleNotification } = useContext(NotificationContext);
  const [passwordError, setPasswordError] = useState<Response>({
    text: '',
    type: 'password',
  });

  const showPasswordError = (text: string) => {
    setPasswordError((prevState) => ({
      ...prevState,
      text: text,
    }));

    setTimeout(() => {
      setPasswordError((prevState) => ({ ...prevState, text: '' }));
    }, 1500);
  };

  async function changePassword(formData: Password) {
    const { currentPassword, newPassword } = formData;

    const response = await fetch('/api/user/changePassword', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message,
        },
      };
    }

    reset(PASSWORD_DEFAULT_VALUES);
    handleNotification({ message: 'Hasło zostało zmienione', status: 'success' });
    return data;
  }

  const submitHandler = async (formValues: FieldValues) => {
    try {
      setIsLoading(true);
      const result = await changePassword(formValues as Password);
      setIsLoading(false);

      if (result.error) {
        const errorText = result.error.message;
        showPasswordError(errorText);
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
        {passwordInputs.map((el, index) => (
          <Input
            key={el.type + index}
            type={el.type}
            content={el.content}
            name={el.name}
            error={errors[el.name as keyof typeof errors]}
            register={register}
            notificationError={index === 0 ? passwordError : undefined}
          />
        ))}

        <Button
          type="submit"
          content={loading ? <Loader /> : 'Zmień hasło'}
          isSmall={true}
          accent={false}
        />
      </form>
    </>
  );
};
