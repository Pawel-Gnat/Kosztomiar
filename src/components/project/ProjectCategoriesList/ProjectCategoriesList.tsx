import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/components/utils/localStorageDatabase';
import styles from './ProjectCategoriesList.module.css';
import { Category, Project } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';
import UserContext from '@/store/user-context';
import { useContext, useState } from 'react';
import { CategoryForm } from '../CategoryForm/CategoryForm';
import { Button } from '@/components/ui/Button/Button';

export const ProjectCategoriesList = (props: { project: Project }) => {
  const [category, setCategory] = useState({
    category: '',
    currentCategoryName: '',
    isEditing: false,
  });
  const context = useContext(UserContext);

  async function deleteCategoryHandler(el: string) {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (project: Project) => JSON.stringify(project) === JSON.stringify(props.project),
    );
    const newCategories = currentProject.data.filter(
      (data: Category) => data.category !== el,
    );
    currentProject.data = newCategories;

    if (existingProjects) {
      await setProjectsToLocalStorage(existingProjects);
      context.setProjects();
    }
  }

  function handleName(value: string) {
    setCategory((prevState) => ({ ...prevState, category: value }));
  }

  function clearForm() {
    setCategory((prevState) => ({
      ...prevState,
      category: '',
      currentCategoryName: '',
      isEditing: false,
    }));
  }

  function handleCancel() {
    clearForm();
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (project: Project) => JSON.stringify(project) === JSON.stringify(props.project),
    );
    const selectedCategory = currentProject.data.find(
      (data: Category) => data.category === category.currentCategoryName,
    );
    selectedCategory.category = category.category;

    if (existingProjects) {
      await setProjectsToLocalStorage(existingProjects);
      context.setProjects();
      clearForm();
    }
  }

  return (
    <>
      <ul className={styles.container}>
        {props.project.data.map((el, index) => (
          <li key={index} className={styles.list}>
            {el.category}
            <Button
              type="button"
              content="Edytuj nazwę"
              isSmall={true}
              accent={false}
              icon={<CiCircleMore />}
              onClick={() =>
                setCategory((prevState) => ({
                  ...prevState,
                  category: el.category,
                  currentCategoryName: el.category,
                  isEditing: true,
                }))
              }
            />
            <Button
              type="button"
              content="Usuń kategorię"
              isSmall={true}
              accent={false}
              icon={<CiCircleRemove />}
              onClick={() => deleteCategoryHandler(el.category)}
            />
          </li>
        ))}
      </ul>
      {category.isEditing && (
        <CategoryForm
          onSubmit={submitHandler}
          onChange={handleName}
          value={category.category}
          onClick={handleCancel}
        />
      )}
    </>
  );
};
