import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import styles from './Input.module.css';
import { AuthError, InputType } from '@/types/types';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { CiRead, CiUnread } from 'react-icons/ci';

type Props<T extends Record<string, unknown>> = {
  type?: InputType | string;
  content: string;
  name: keyof T | string;
  value?: string;
  error?: Omit<FieldError, 'type'>;
  register: UseFormRegister<T>;
  authError?: AuthError;
};

export const Input = <T extends Record<string, unknown>>({
  type,
  content,
  name,
  error,
  register,
  authError,
}: Props<T>) => {
  const activeAuthError = authError?.text && authError?.type === type;
  const labelClass =
    error || activeAuthError ? `${styles.input} ${styles.error}` : styles.input;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <input
        className={labelClass}
        type={showPassword ? 'text' : type}
        id={name.toString()}
        placeholder=" "
        autoComplete="off"
        {...register(name as Path<T>)}
      />
      <label className={styles.label} htmlFor={name.toString()}>
        {content}
      </label>

      {type === 'password' && (
        <Button
          type="button"
          isSmall={true}
          accent={false}
          content={showPassword ? <CiUnread /> : <CiRead />}
          onClick={() => setShowPassword((prevState) => !prevState)}
          aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
        />
      )}

      {error && (type === 'text' || type === 'email' || type === 'password') && (
        <p className={`${styles['error-text']} ${styles.error}`}>{error.message}</p>
      )}

      {activeAuthError && (
        <p className={`${styles['error-text']} ${styles.error}`}>{authError.text}</p>
      )}
    </div>
  );
};

export const CheckboxInput = <T extends Record<string, unknown>>({
  content,
  value,
  name,
  error,
  register,
}: Props<T>) => {
  const labelClass = error
    ? `${styles['radio-box-label']} ${styles.error}`
    : styles['radio-box-label'];

  return (
    <div className={styles['radio-box-container']}>
      <input
        className={styles['radio-box-input']}
        id={content}
        type="checkbox"
        value={value}
        {...register(name as Path<T>)}
      />
      <label className={`${labelClass}`} htmlFor={content}>
        {content}
      </label>
    </div>
  );
};

export const RadioInput = <T extends Record<string, unknown>>({
  content,
  value,
  name,
  error,
  register,
}: Props<T>) => {
  const labelClass = error
    ? `${styles['radio-box-label']} ${styles.error}`
    : styles['radio-box-label'];

  return (
    <div className={styles['radio-box-container']}>
      <input
        className={styles['radio-box-input']}
        id={content}
        type="radio"
        value={value}
        {...register(name as Path<T>)}
      />
      <label className={labelClass} htmlFor={content}>
        {content}:
      </label>
    </div>
  );
};
