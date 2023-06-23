import { useRef } from 'react';
import styles from './Select.module.css';
import { FieldErrors, ControllerRenderProps } from 'react-hook-form';
import { FormElement } from '@/types/types';

type Props = {
  name: string;
  value: string[];
  options: string[];
  error?: FieldErrors<FormElement>;
  field: ControllerRenderProps<FormElement, 'unit'>;
};

export const Select = ({ name, value, options, error, field }: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = () => {
    const selectedValue = selectRef.current?.value;
    field.onChange(selectedValue);
  };

  const selectClass = error ? `${styles.select} ${styles.error}` : `${styles.select}`;

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        J.m.
      </label>

      <select
        id={name}
        className={selectClass}
        ref={selectRef}
        onChange={handleSelectChange}
      >
        <option value={value} hidden={true}>
          {value}
        </option>

        {options.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};
