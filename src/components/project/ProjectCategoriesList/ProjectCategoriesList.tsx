import styles from './ProjectCategoriesList.module.css';
import { FormCategory, Project } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';
import { UserContext } from '@/store/user-context';
import { useContext, useState } from 'react';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { Button } from '@/components/ui/Button/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCategory } from '@/utils/deleteUtils';
import { NewCategoryFormSchema } from '@/schemas/NewCategoryFormSchema';
import { editCategory } from '@/utils/editUtils';
import { useModal } from '@/hooks/useModal';
import { DeleteModal } from '@/components/modal/DeleteModal';
import { Text } from '@/components/ui/Text/Text';

export const ProjectCategoriesList = (props: { project: Project }) => {
  const { project } = props;
  const [form, setForm] = useState({ currentCategoryName: '', isActive: false });
  const [category, setCategory] = useState('');
  const context = useContext(UserContext);
  const { isModalOpen, handleModal } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    resolver: zodResolver(NewCategoryFormSchema(project)),
  });

  const hideModal = () => {
    handleModal({ active: false, type: '', name: '' });
    setCategory('');
  };

  const deleteCategoryHandler = async (project: Project) => {
    await deleteCategory(project, category);
    context.setProjects();
    hideModal();
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
      <Text content="Twoje kategorie w projekcie" />
      <ul className={styles.container}>
        {project.data.map((el, index) => (
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
                onClick={() => {
                  handleModal({
                    active: true,
                    type: 'kategorię',
                    name: el.category,
                  });
                  setCategory(el.category);
                }}
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
      {isModalOpen.active && (
        <DeleteModal
          type={isModalOpen.type}
          name={isModalOpen.name}
          handleCancel={hideModal}
          handleDelete={() => deleteCategoryHandler(project)}
        />
      )}
    </>
  );
};
