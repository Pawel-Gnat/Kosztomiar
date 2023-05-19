import styles from './RadioInput.module.css';
import { useRef } from 'react';

type Props = {
  content: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export const RadioInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    if (inputRef.current && inputRef.current.checked) {
      props.onChange(props.value);
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        id={props.content}
        type="radio"
        name={props.name}
        ref={inputRef}
        onChange={handleInput}
        value={props.value}
      />
      <label className={styles.label} htmlFor={props.content}>
        {props.content}:
      </label>
    </div>
  );
};
