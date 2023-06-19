import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form';
import styles from './Input.module.css';
import { FormCategory, FormProject } from '@/types/types';

type Props = {
  type?: 'text' | 'number';
  content: string;
  name: keyof FormProject;
  value?: string;
  error?: FieldError;
  register: UseFormRegister<{
    name: string;
    units: null;
    price: string;
    currency: string;
  }>;
};

// type Props<T> = {
//   type?: 'text' | 'number';
//   content: string;
//   name: keyof T;
//   value?: string;
//   error?: FieldError;
//   register: UseFormRegister<T>;
// };

export const Input = ({ type, content, name, error, register }: Props) => {
  // export const Input = <T,>({ type, content, name, error, register }: Props<T>) => {
  const labelClass = error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <div className={styles.container}>
      <input
        className={labelClass}
        type={type}
        id={name}
        placeholder=" "
        autoComplete="off"
        {...register(name)}
      />
      <label className={styles.label} htmlFor={name}>
        {content}
      </label>
      {error && (
        <p className={`${styles['error-text']} ${styles.error}`}>{error.message}</p>
      )}
    </div>
  );
};

// type PropsCategory<T> = {
//   type?: 'text' | 'number';
//   content: string;
//   name: keyof T;
//   value?: string;
//   error?: FieldError;
//   // register: UseFormRegister<T>;
//   register: UseFormRegister<{
//     category: string;
//   }>;
// };

type PropsCategory = {
  type?: 'text' | 'number';
  content: string;
  name: keyof FormCategory;
  value?: string;
  error?: FieldError;
  // register: UseFormRegister<T>;
  register: UseFormRegister<{
    category: string;
  }>;
};

export const InputCategory = ({
  type,
  content,
  name,
  error,
  register,
}: PropsCategory) => {
  // export const InputCategory = <T,>({
  //   type,
  //   content,
  //   name,
  //   error,
  //   register,
  // }: PropsCategory<T>) => {
  const labelClass = error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <div className={styles.container}>
      <input
        className={labelClass}
        type={type}
        id={name}
        placeholder=" "
        autoComplete="off"
        {...register(name)}
      />
      <label className={styles.label} htmlFor={name}>
        {content}
      </label>
      {error && (
        <p className={`${styles['error-text']} ${styles.error}`}>{error.message}</p>
      )}
    </div>
  );
};

export const CheckboxInput = ({ content, value, name, error, register }: Props) => {
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
        {...register(name)}
      />
      <label className={`${labelClass}`} htmlFor={content}>
        {content}
      </label>
    </div>
  );
};

export const RadioInput = ({ content, value, name, error, register }: Props) => {
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
        {...register(name)}
      />
      <label className={labelClass} htmlFor={content}>
        {content}:
      </label>
    </div>
  );
};
