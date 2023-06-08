import styles from './Input.module.css';
import { useRef } from 'react';

type Props = {
  type?: 'text' | 'number';
  content: string;
  name?: string;
  value: string;
  error: boolean;
  errorText?: string;
  onChange: (value: string) => void;
};

export const Input = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    if (inputRef.current) {
      const value = inputRef.current.value.trimStart();
      props.onChange(handleWhiteSpace(value));
    }
  }

  function handleWhiteSpace(text: string) {
    return text.replace(/\s+/g, ' ');
  }

  const labelClass = props.error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <div className={styles.container}>
      <input
        className={labelClass}
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder=" "
        autoComplete="off"
        ref={inputRef}
        value={props.value}
        onChange={handleInput}
        required={true}
      />
      <label className={styles.label} htmlFor={props.name}>
        {props.content}
      </label>
      {props.error ? (
        <p className={`${styles['error-text']} ${styles.error}`}>{props.errorText}</p>
      ) : null}
    </div>
  );
};

export const RadioInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    if (inputRef.current && inputRef.current.checked) {
      props.onChange(props.value);
    }
  }

  const labelClass = props.error
    ? `${styles['radio-box-label']} ${styles.error}`
    : styles['radio-box-label'];

  return (
    <div className={styles['radio-box-container']}>
      <input
        className={styles['radio-box-input']}
        id={props.content}
        type="radio"
        name={props.name}
        ref={inputRef}
        onChange={handleInput}
        value={props.value}
      />
      <label className={labelClass} htmlFor={props.content}>
        {props.content}:
      </label>
    </div>
  );
};

export const CheckboxInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      props.onChange(value);
    }
  }

  const labelClass = props.error
    ? `${styles['radio-box-label']} ${styles.error}`
    : styles['radio-box-label'];

  return (
    <div className={styles['radio-box-container']}>
      <input
        className={styles['radio-box-input']}
        id={props.content}
        type="checkbox"
        name={`measurement-unit-${props.content}`}
        ref={inputRef}
        value={props.value}
        onChange={handleInput}
      />
      <label className={`${labelClass}`} htmlFor={props.content}>
        {props.content}
      </label>
    </div>
  );
};
