import { useRef } from 'react';
import styles from './Select.module.css';

type Props = {
  value: string;
  measurements: string[];
  onChange: (value: string) => void;
};

export const Select = (props: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleSelect() {
    if (selectRef.current) {
      const value = selectRef.current.value;
      props.onChange(value);
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="units">
        J.m.
      </label>
      <select id="units" ref={selectRef} onChange={handleSelect} required={true}>
        <option value={props.value} hidden={true}>
          {props.value}
        </option>

        {props.measurements.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};
