import styles from './NewCategoryElementForm.module.css';
import { useProject } from '@/hooks/useProject';
import { Input } from '@/components/ui/Input/Input';
import { useContext, useEffect, useState } from 'react';
import { createNewCategoryElement } from '@/components/utils/createNewCategoryElement';
import { Select } from '@/components/ui/Select/Select';
import UserContext from '@/store/user-context';
import { Category, EditedElement, Element } from '@/types/types';
import { deleteCategoryElement } from '@/components/utils/deleteCategoryElement';
import { Button } from '@/components/ui/Button/Button';
import { FiPlusSquare } from 'react-icons/fi';

type Props = {
  category: string;
  editedElement: EditedElement;
  onEdit: (element: EditedElement) => void;
};

export const NewCategoryElementForm = (props: Props) => {
  const project = useProject()!;
  const [isFormActive, setIsFormActive] = useState(false);
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
  const [error, setError] = useState({
    nameError: false,
    errorText: '',
    valueError: false,
    unitError: false,
    priceError: false,
  });

  const context = useContext(UserContext);

  useEffect(() => {
    if (props.editedElement.isEditing) {
      setNewElement(props.editedElement.element);
      setEditedElement(props.editedElement.element);
      toggleActiveForm();
    }
  }, [props.editedElement]);

  function toggleActiveForm() {
    setIsFormActive((prevState) => !prevState);
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
    if (props.editedElement.isEditing) {
      resetEditedElementState();
      props.onEdit({
        element: {
          name: '',
          value: '',
          unit: '',
          price: '',
        },
        isEditing: false,
      });
    }

    toggleActiveForm();
    clearForm();
  }

  function handleNameError() {
    if (newElement.name === '') {
      setError((prevState) => ({
        ...prevState,
        nameError: true,
        errorText: 'Podaj nazwę',
      }));

      setTimeout(() => {
        setError((prevState) => ({
          ...prevState,
          nameError: false,
          errorText: '',
        }));
      }, 1500);
    }
  }

  function getCategory(categoryName: string) {
    const existingProject: Category[] = project.data;
    return existingProject.find(
      (categoryContainer) => categoryContainer.category === categoryName,
    );
  }

  function checkIfNameExists(elementName: string) {
    const currentCategory = getCategory(props.category)!;

    if (
      props.editedElement.isEditing &&
      editedElement.name.toLowerCase() === elementName.toLowerCase()
    ) {
      return false;
    }

    if (
      currentCategory.elements.find(
        (element) => element.name.toLowerCase() === elementName.toLowerCase(),
      )
    ) {
      setError((prevState) => ({
        ...prevState,
        nameError: true,
        errorText: 'Nazwa już istnieje',
      }));

      setTimeout(() => {
        setError((prevState) => ({
          ...prevState,
          nameError: false,
          errorText: '',
        }));
      }, 1500);

      return true;
    }
  }

  function handleValueError() {
    const element = props.editedElement.isEditing ? editedElement : newElement;

    if (element.value === '' || +element.value <= 0) {
      setError((prevState) => ({ ...prevState, valueError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, valueError: false }));
      }, 1500);
    }
  }

  function handleUnitError() {
    const element = props.editedElement.isEditing ? editedElement : newElement;

    if (element.unit === '') {
      setError((prevState) => ({ ...prevState, unitError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, unitError: false }));
      }, 1500);
    }
  }

  function handlePriceError() {
    const element = props.editedElement.isEditing ? editedElement : newElement;

    if (element.price === '' || +element.price <= 0) {
      setError((prevState) => ({ ...prevState, priceError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, priceError: false }));
      }, 1500);
    }
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleNameError();
    handleValueError();
    handleUnitError();
    handlePriceError();

    if (
      checkIfNameExists(newElement.name) ||
      !newElement.name ||
      !newElement.value ||
      +newElement.value <= 0 ||
      !newElement.unit ||
      (project.price && !newElement.price) ||
      (project.price && +newElement.price <= 0)
    ) {
      return;
    }

    if (project) {
      if (props.editedElement.isEditing) {
        await deleteCategoryElement(project.id, props.category, editedElement);
        resetEditedElementState();
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
        <form className={styles.form} autoComplete="off" onSubmit={submitHandler}>
          <div className={styles.inputs}>
            <Input
              type="text"
              content="Nazwa"
              name="material-name"
              value={newElement.name}
              onChange={handleName}
              error={error.nameError}
              errorText={error.errorText}
            />
            <Input
              type="number"
              content="Ilość"
              name="material-value"
              value={newElement.value}
              onChange={handleValue}
              error={error.valueError}
            />
            {project && (
              <Select
                key={newElement.unit}
                measurements={project.measurements}
                onChange={handleSelect}
                value={newElement.unit}
                error={error.unitError}
              />
            )}
            {project && project.price && (
              <Input
                type="number"
                content="Cena"
                name="material-price"
                value={newElement.price}
                onChange={handlePrice}
                error={error.priceError}
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
              content="Dodaj"
              isSmall={true}
              accent={false}
              icon={<FiPlusSquare />}
            />
          </div>
        </form>
      ) : (
        <Button
          type="button"
          content="Dodaj materiał"
          isSmall={true}
          accent={true}
          onClick={toggleActiveForm}
        />
      )}
    </>
  );
};
