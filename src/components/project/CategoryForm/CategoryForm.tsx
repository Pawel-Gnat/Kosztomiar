import styles from './CategoryForm.module.css';
import { Input } from '@/components/ui/Input/Input';

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
        <Input
          type="text"
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
