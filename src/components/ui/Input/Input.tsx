import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import styles from './Input.module.css';

type Props<T extends Record<string, unknown>> = {
  type?: 'text' | 'number';
  content: string;
  name: keyof T;
  value?: string;
  error?: Omit<FieldError, 'type'>;
  register: UseFormRegister<T>;
};

export const Input = <T extends Record<string, unknown>>({
  type,
  content,
  name,
  error,
  register,
}: Props<T>) => {
  const labelClass = error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <div className={styles.container}>
      <input
        className={labelClass}
        type={type}
        id={name.toString()}
        placeholder=" "
        autoComplete="off"
        {...register(name as Path<T>)}
      />
      <label className={styles.label} htmlFor={name.toString()}>
        {content}
      </label>
      {error && type === 'text' && (
        <p className={`${styles['error-text']} ${styles.error}`}>{error.message}</p>
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
