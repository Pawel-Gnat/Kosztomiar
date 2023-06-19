import { Button } from '@/components/ui/Button/Button';
import styles from './CategoryForm.module.css';
import { Input, InputCategory } from '@/components/ui/Input/Input';
import { FiPlusSquare } from 'react-icons/fi';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FormCategory } from '@/types/types';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: FieldErrors<FormCategory>;
  register: UseFormRegister<FormCategory>;
  onClick: () => void;
};

export const CategoryForm = ({ onSubmit, error, register, onClick }: Props) => {
  return (
    <form autoComplete="off" className={styles.form} onSubmit={onSubmit}>
      {/* <Input
        type="text"
        content="Nazwa kategorii"
        name="category"
        error={error.category}
        register={register}
      /> */}

      <InputCategory
        type="text"
        content="Nazwa kategorii"
        name="category"
        error={error.category}
        register={register}
      />

      <div className={styles.buttons}>
        <Button
          type="button"
          content="Anuluj"
          isSmall={true}
          accent={false}
          onClick={onClick}
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
  );
};
