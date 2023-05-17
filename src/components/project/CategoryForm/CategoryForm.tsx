import styles from './CategoryForm.module.css';
import { TextInput } from '@/components/ui/Input/TextInput/TextInput';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (value: string) => void;
  value: string;
  onClick: () => void;
};

export const CategoryForm = (props: Props) => {
  return (
    <>
      <form autoComplete="off" onSubmit={props.onSubmit}>
        <TextInput
          content="Nazwa kategorii"
          name="category-name"
          value={props.value}
          onChange={props.onChange}
        />
        <button type="button" onClick={props.onClick}>
          Anuluj
        </button>
        <button type="submit">Dodaj</button>
      </form>
    </>
  );
};
