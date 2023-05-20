import styles from './Input.module.css';
import { useRef } from 'react';

type Props = {
  type?: 'text' | 'number';
  content: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      props.onChange(value);
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
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
      <label className={styles['radio-box-label']} htmlFor={props.content}>
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
      <label className={styles['radio-box-label']} htmlFor={props.content}>
        {props.content}
      </label>
    </div>
  );
};
