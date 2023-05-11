import { useRef } from 'react';
import './Select.module.css';

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
    <>
      <label htmlFor="units">J.m.</label>
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
    </>
  );
};
