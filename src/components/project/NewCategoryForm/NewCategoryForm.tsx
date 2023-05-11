import styles from './NewCategoryForm.module.css';
import { TextInput } from '@/components/ui/Input/TextInput/TextInput';
import { useContext, useState } from 'react';
import { useProject } from '@/hooks/useProject';
import { createNewCategory } from '@/components/utils/createNewCategory';
import { Category } from '@/types/types';
import UserContext from '@/store/user-context';

export const NewCategoryForm = () => {
  const project = useProject();
  const [category, setCategory] = useState<Category>({
    category: '',
    elements: [],
  });

  const context = useContext(UserContext);

  function handleName(value: string) {
    setCategory((prevState) => ({ ...prevState, category: value }));
  }

  function clearForm() {
    setCategory((prevState) => ({ ...prevState, category: '' }));
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearForm();

    if (project) {
      await createNewCategory(project.id, project.name, category);
      context.setProjects();
    }
  }

  return (
    <>
      <button>Stwórz kategorię</button>
      <form autoComplete="off" onSubmit={submitHandler}>
        <TextInput
          content="Nazwa kategorii"
          name="category-name"
          value={category.category}
          onChange={handleName}
        />
      </form>
    </>
  );
};
