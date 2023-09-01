import { FC } from 'react';
import { Input } from '../Input/Input';

type Props = {
  setSearchbarValue: (value: string) => void;
};

export const Searchbar: FC<Props> = ({ setSearchbarValue }) => {
  return (
    <Input
      type="text"
      content="Wyszukaj materiał"
      name="searchbar"
      onChange={setSearchbarValue}
    />
  );
};
