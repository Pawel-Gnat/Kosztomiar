import { Input } from '../Input/Input';

type Props = {
  setSearchbarValue: (value: string) => void;
};

export const Searchbar = ({ setSearchbarValue }: Props) => {
  return (
    <label>
      <Input
        type="text"
        content="Wyszukaj materiał"
        name="searchbar"
        onChange={setSearchbarValue}
      />
    </label>
  );
};
