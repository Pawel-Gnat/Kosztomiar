import styles from './NewCategoryForm.module.css';
import { useContext, useState } from 'react';
import { useProject } from '@/hooks/useProject';
import { createNewCategory } from '@/components/utils/createNewCategory';
import { Category } from '@/types/types';
import UserContext from '@/store/user-context';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { Button } from '@/components/ui/Button/Button';

export const NewCategoryForm = () => {
  const project = useProject();
  const [category, setCategory] = useState<Category>({
    category: '',
    elements: [],
  });
  const [isFormActive, setIsFormActive] = useState(false);

  const context = useContext(UserContext);

  function toggleActiveForm() {
    setIsFormActive((prevState) => !prevState);
  }

  function handleName(value: string) {
    setCategory((prevState) => ({ ...prevState, category: value }));
  }

  function clearForm() {
    setCategory((prevState) => ({ ...prevState, category: '' }));
  }

  function handleCancel() {
    toggleActiveForm();
    clearForm();
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (project) {
      await createNewCategory(project.id, project.name, category);
      clearForm();
      toggleActiveForm();
      context.setProjects();
    }
  }

  return (
    <>
      {isFormActive ? (
        <CategoryForm
          onSubmit={submitHandler}
          onChange={handleName}
          value={category.category}
          onClick={handleCancel}
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
