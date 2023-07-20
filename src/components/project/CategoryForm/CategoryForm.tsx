import { Button } from '@/components/ui/Button/Button';
import styles from './CategoryForm.module.css';
import { Input } from '@/components/ui/Input/Input';
import { FiPlusSquare } from 'react-icons/fi';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormCategory } from '@/types/types';
import { Loader } from '@/components/loader/Loader';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: FieldErrors<FormCategory>;
  register: UseFormRegister<FormCategory>;
  onClick: () => void;
  loading: boolean;
};

export const CategoryForm = ({ onSubmit, error, register, onClick, loading }: Props) => {
  return (
    <form autoComplete="off" className={styles.form} onSubmit={onSubmit}>
      <Input
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
          content={loading ? <Loader /> : 'Dodaj'}
          isSmall={true}
          accent={false}
          icon={!loading && <FiPlusSquare />}
        />
      </div>
    </form>
  );
};
