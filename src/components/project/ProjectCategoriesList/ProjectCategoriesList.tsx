import styles from './ProjectCategoriesList.module.css';
import { FormCategory, Project } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';
import { UserContext } from '@/store/user-context';
import { FC, useContext, useState } from 'react';
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
import { useSession } from 'next-auth/react';
import { LoadingContext } from '@/store/loading-context';
import { NotificationContext } from '@/store/notification-context';

export const ProjectCategoriesList: FC<{ project: Project }> = ({ project }) => {
  const [form, setForm] = useState({ currentCategoryName: '', isActive: false });
  const [category, setCategory] = useState('');
  const { data: session, status } = useSession();
  const context = useContext(UserContext);
  const { handleNotification } = useContext(NotificationContext);
  const { loading, setIsLoading } = useContext(LoadingContext);
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
    await deleteCategory(project.id, category, session);
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
    const fnArguments = {
      projectId: project.id,
      currentCategoryName: form.currentCategoryName,
      categoryData: formValues.category,
      session,
    };

    setIsLoading(true);
    await editCategory(fnArguments);
    setIsLoading(false);
    handleForm();
    handleNotification({ message: 'Zmieniono nazwę kategorii', status: 'success' });
    setCurrentCategoryName('');
    context.setProjects();
  };

  const CategoryList = (
    <ul>
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
  );

  return (
    <div className={styles.container}>
      <Text
        content={
          project.data.length > 0
            ? 'Twoje kategorie w projekcie'
            : 'Brak utworzonych kategorii w projekcie do zarządzania'
        }
      />

      {project.data.length > 0 && CategoryList}

      {form.isActive && (
        <CategoryForm
          onSubmit={handleSubmit(submitHandler)}
          onClick={handleForm}
          error={errors}
          register={register}
          loading={loading}
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
    </div>
  );
};
