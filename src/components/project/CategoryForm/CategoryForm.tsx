import { Button } from '@/components/ui/Button/Button';
import styles from './CategoryForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FiPlusSquare } from 'react-icons/fi';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (value: string) => void;
  value: string;
  onClick: () => void;
};

export const CategoryForm = (props: Props) => {
  return (
    <>
      <form autoComplete="off" className={styles.form} onSubmit={props.onSubmit}>
        <Input
          type="text"
          content="Nazwa kategorii"
          name="category-name"
          value={props.value}
          onChange={props.onChange}
        />
        <div className={styles.buttons}>
          <Button
            type="button"
            content="Anuluj"
            isSmall={true}
            accent={false}
            onClick={props.onClick}
          />
          <Button
            type="submit"
            content="Dodaj"
            isSmall={true}
            accent={false}
            icon={<FiPlusSquare />}
          />
        </div>
      </form>
    </>
  );
};
