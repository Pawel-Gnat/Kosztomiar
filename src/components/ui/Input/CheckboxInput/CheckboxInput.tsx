import styles from './CheckboxInput.module.css';
import { useRef } from 'react';

type Props = {
  content: string;
  value: string;
  onChange: (value: string) => void;
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
    <div className={styles.container}>
      <input
        className={styles.input}
        id={props.content}
        type="checkbox"
        name={`measurement-unit-${props.content}`}
        ref={inputRef}
        value={props.value}
        onChange={handleInput}
      />
      <label className={styles.label} htmlFor={props.content}>
        {props.content}
      </label>
    </div>
  );
};
