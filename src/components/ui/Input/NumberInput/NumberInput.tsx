import { useRef } from 'react';
import styles from './NumberInput.module.css';

type Props = {
  content: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export const NumberInput = (props: Props) => {
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
        type="number"
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
