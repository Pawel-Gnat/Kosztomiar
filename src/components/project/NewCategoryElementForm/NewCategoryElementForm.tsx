import styles from './NewCategoryElementForm.module.css';
import { useProject } from '@/hooks/useProject';
import { Input } from '@/components/ui/Input/Input';
import { useContext, useEffect, useState } from 'react';
import { createNewCategoryElement } from '@/components/utils/createNewCategoryElement';
import { Select } from '@/components/ui/Select/Select';
import UserContext from '@/store/user-context';
import { Element } from '@/types/types';
import { deleteCategoryElement } from '@/components/utils/deleteCategoryElement';

type Props = {
  category: string;
  editedElement: Element | null;
};

export const NewCategoryElementForm = (props: Props) => {
  const project = useProject();
  const [isFormActive, setIsFormActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedElement, setEditedElement] = useState<Element>({
    name: '',
    value: '',
    unit: '',
    price: '',
  });
  const [newElement, setNewElement] = useState<Element>({
    name: '',
    value: '',
    unit: '',
    price: '',
  });

  const context = useContext(UserContext);

  useEffect(() => {
    if (props.editedElement) {
      setNewElement(props.editedElement);
      setEditedElement(props.editedElement);
      toggleActiveForm();
      toggleEditing();
    }
  }, [props.editedElement]);

  function toggleActiveForm() {
    setIsFormActive((prevState) => !prevState);
  }

  function toggleEditing() {
    setIsEditing((prevState) => !prevState);
  }

  function handleName(value: string) {
    setNewElement((prevState) => ({ ...prevState, name: value }));
  }

  function handleValue(newValue: string) {
    setNewElement((prevState) => ({ ...prevState, value: newValue }));
  }

  function handlePrice(newPrice: string) {
    setNewElement((prevState) => ({ ...prevState, price: newPrice }));
  }

  function handleSelect(value: string) {
    setNewElement((prevState) => ({ ...prevState, unit: value }));
  }

  function clearForm() {
    setNewElement((prevState) => ({
      ...prevState,
      name: '',
      value: '',
      unit: '',
      price: '',
    }));
  }

  function resetEditedElementState() {
    setEditedElement((prevState) => ({
      ...prevState,
      name: '',
      value: '',
      unit: '',
      price: '',
    }));
  }

  function handleCancel() {
    if (isEditing) {
      resetEditedElementState();
      toggleEditing();
    }

    toggleActiveForm();
    clearForm();
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (project) {
      if (isEditing) {
        await deleteCategoryElement(project.id, props.category, editedElement);
        resetEditedElementState();
        toggleEditing();
      }

      await createNewCategoryElement(
        project.id,
        project.name,
        props.category,
        newElement,
      );
      context.setProjects();
      toggleActiveForm();
    }
    clearForm();
  }

  return (
    <>
      {isFormActive ? (
        <form autoComplete="off" onSubmit={submitHandler}>
          <Input
            type="text"
            content="Nazwa materiału"
            name="material-name"
            value={newElement.name}
            onChange={handleName}
          />
          <Input
            type="number"
            content="Wartość"
            name="material-value"
            value={newElement.value}
            onChange={handleValue}
          />
          {project && (
            <Select
              key={newElement.unit}
              measurements={project.measurements}
              onChange={handleSelect}
              value={newElement.unit}
            />
          )}
          {project && project.price && (
            <Input
              type="number"
              content="Cena"
              name="material-price"
              value={newElement.price}
              onChange={handlePrice}
            />
          )}
          <button type="button" onClick={handleCancel}>
            Anuluj
          </button>
          <button type="submit">Dodaj</button>
        </form>
      ) : (
        <button onClick={toggleActiveForm}>Dodaj materiał</button>
      )}
    </>
  );
};
