import styles from './NewCategoryElementForm.module.css';
import { useProject } from '@/hooks/useProject';
import { Input } from '@/components/ui/Input/Input';
import { Dispatch, SetStateAction } from 'react';
import { Select } from '@/components/ui/Select/Select';
import { FormElement } from '@/types/types';
import { Button } from '@/components/ui/Button/Button';
import { FiPlusCircle } from 'react-icons/fi';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  ControllerRenderProps,
  UseFormReset,
} from 'react-hook-form';
import { Loader } from '@/components/loader/Loader';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: FieldErrors<FormElement>;
  register: UseFormRegister<FormElement>;
  control: Control<FormElement>;
  field: ControllerRenderProps<FormElement, 'unit'>;
  reset: UseFormReset<FormElement>;
  isFormActive: boolean;
  setIsFormActive: Dispatch<
    SetStateAction<{
      isActive: boolean;
      isEditing: boolean;
    }>
  >;
  loading: boolean;
};

export const NewCategoryElementForm = ({
  onSubmit,
  error,
  register,
  field,
  reset,
  isFormActive,
  setIsFormActive,
  loading,
}: Props) => {
  const project = useProject()!;

  const handleCancel = () => {
    reset((prevState) => ({
      ...prevState,
      name: '',
      value: 0,
      unit: [''],
      price: '0',
    }));

    setIsFormActive((prevState) => ({
      ...prevState,
      isActive: false,
      isEditing: false,
    }));
  };

  return (
    <>
      {isFormActive ? (
        <form className={styles.form} autoComplete="off" onSubmit={onSubmit}>
          <div className={styles.inputs}>
            <Input
              type="text"
              content="Nazwa"
              name="name"
              error={error.name}
              register={register}
            />
            <Input
              type="number"
              content="Ilość"
              name="value"
              error={error.value}
              register={register}
            />

            <Select
              name="unit"
              options={project.measurements}
              error={error.unit}
              value={field.value}
              field={field}
            />

            {project.price === 'true' && (
              <Input
                type="number"
                content="Cena"
                name="price"
                error={error.price}
                register={register}
              />
            )}
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              content="Anuluj"
              isSmall={true}
              accent={false}
              onClick={handleCancel}
            />
            <Button
              type="submit"
              content={loading ? <Loader /> : 'Dodaj'}
              isSmall={true}
              accent={false}
              icon={!loading && <FiPlusCircle />}
            />
          </div>
        </form>
      ) : (
        <Button
          type="button"
          content="Dodaj materiał"
          isSmall={true}
          accent={true}
          onClick={() =>
            setIsFormActive((prevState) => ({
              ...prevState,
              isActive: true,
              isEditing: false,
            }))
          }
        />
      )}
    </>
  );
};
