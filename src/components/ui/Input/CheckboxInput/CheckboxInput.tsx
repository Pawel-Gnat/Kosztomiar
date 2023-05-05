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
    <label>
      {props.content}:
      <input
        type="checkbox"
        name={`measurement-unit-${props.content}`}
        ref={inputRef}
        value={props.value}
        onChange={handleInput}
      />
    </label>
  );
};
