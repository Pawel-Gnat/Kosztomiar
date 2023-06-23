import styles from './ProjectCategoriesList.module.css';
import { FormCategory, Project } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';
import UserContext from '@/store/user-context';
import { useContext, useState } from 'react';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { Button } from '@/components/ui/Button/Button';
import { useProject } from '@/hooks/useProject';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCategory } from '@/components/utils/deleteUtils';
import { NewCategoryFormSchema } from '@/schemas/NewCategoryFormSchema';
import { editCategory } from '@/components/utils/editUtils';

export const ProjectCategoriesList = (props: { project: Project }) => {
  const [form, setForm] = useState({ currentCategoryName: '', isActive: false });
  const context = useContext(UserContext);
  const project = useProject()!;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    resolver: zodResolver(NewCategoryFormSchema(project)),
  });

  const deleteCategoryHandler = async (el: string) => {
    await deleteCategory(project, el);
    context.setProjects();
  };

  const toggleActiveForm = () => {
    setForm((prevState) => ({ ...prevState, isActive: !prevState.isActive }));
  };

  const setCurrentCategoryName = (el: string) => {
    setForm((prevState) => ({ ...prevState, currentCategoryName: el }));
  };

  const handleEdit = (el: string) => {
    form.isActive
      ? (reset({ category: el }), setCurrentCategoryName(el))
      : toggleActiveForm();

    reset({ category: el });
    setCurrentCategoryName(el);
  };

  const handleForm = () => {
    reset();
    toggleActiveForm();
  };

  const submitHandler = async (formValues: FieldValues) => {
    await editCategory(project, form.currentCategoryName, formValues.category);
    handleForm();
    setCurrentCategoryName('');
    context.setProjects();
  };

  return (
    <>
      <ul className={styles.container}>
        {props.project.data.map((el, index) => (
          <li key={index} className={styles.list}>
            <span>{el.category}</span>
            <div>
              <Button
                type="button"
                content="Edytuj nazwę"
                isSmall={true}
                accent={false}
                icon={<CiCircleMore />}
                onClick={() => handleEdit(el.category)}
              />
              <Button
                type="button"
                content="Usuń kategorię"
                isSmall={true}
                accent={false}
                icon={<CiCircleRemove />}
                onClick={() => deleteCategoryHandler(el.category)}
              />
            </div>
          </li>
        ))}
      </ul>
      {form.isActive && (
        <CategoryForm
          onSubmit={handleSubmit(submitHandler)}
          onClick={handleForm}
          error={errors}
          register={register}
        />
      )}
    </>
  );
};
