import styles from './NewCategoryForm.module.css';
import { useContext, useState } from 'react';
import { useProject } from '@/hooks/useProject';
import { createNewCategory } from '@/components/utils/createUtils';
import UserContext from '@/store/user-context';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { Button } from '@/components/ui/Button/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewCategoryFormSchema } from '@/schemas/NewCategoryFormSchema';
import { FormCategory } from '@/types/types';

export const NewCategoryForm = () => {
  const project = useProject()!;
  const context = useContext(UserContext);
  const [isFormActive, setIsFormActive] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    defaultValues: {
      category: '',
    },
    resolver: zodResolver(NewCategoryFormSchema(project)),
  });

  const toggleActiveForm = () => {
    setIsFormActive((prevState) => !prevState);
  };

  const handleCancel = () => {
    toggleActiveForm();
    reset();
  };

  const setCategoryValues = (values: FieldValues) => {
    const data = {
      category: values.category,
      elements: [],
    };

    return data;
  };

  const submitHandler = async (formValues: FieldValues) => {
    const data = setCategoryValues(formValues);
    await createNewCategory(project.id, project.name, data);
    toggleActiveForm();
    reset();
    context.setProjects();
  };

  return (
    <>
      {isFormActive ? (
        <CategoryForm
          onSubmit={handleSubmit(submitHandler)}
          onClick={handleCancel}
          error={errors}
          register={register}
        />
      ) : (
        <Button
          type="button"
          content="Stwórz kategorię"
          isSmall={true}
          accent={true}
          onClick={toggleActiveForm}
        />
      )}
    </>
  );
};
