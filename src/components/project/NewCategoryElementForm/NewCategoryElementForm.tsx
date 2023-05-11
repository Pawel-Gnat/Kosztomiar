import styles from './NewCategoryElementForm.module.css';
import { useProject } from '@/hooks/useProject';
import { TextInput } from '@/components/ui/Input/TextInput/TextInput';
import { useContext, useState } from 'react';
import { createNewCategoryElement } from '@/components/utils/createNewCategoryElement';
import { NumberInput } from '@/components/ui/Input/NumberInput/NumberInput';
import { Select } from '@/components/ui/Select/Select';
import UserContext from '@/store/user-context';

export const NewCategoryElementForm = (props: { category: string }) => {
  const project = useProject();
  const [element, setElement] = useState({
    name: '',
    value: '',
    unit: '',
    price: '',
  });

  const context = useContext(UserContext);

  function handleName(value: string) {
    setElement((prevState) => ({ ...prevState, name: value }));
  }

  function handleValue(newValue: string) {
    setElement((prevState) => ({ ...prevState, value: newValue }));
  }

  function handlePrice(newPrice: string) {
    setElement((prevState) => ({ ...prevState, price: newPrice }));
  }

  function handleSelect(value: string) {
    setElement((prevState) => ({ ...prevState, unit: value }));
  }

  function clearForm() {
    setElement((prevState) => ({
      ...prevState,
      name: '',
      value: '',
      unit: '',
      price: '',
    }));
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (project) {
      await createNewCategoryElement(project.id, project.name, props.category, element);
      context.setProjects();
    }
    clearForm();
  }

  return (
    <>
      <button>Dodaj materiał</button>
      <form autoComplete="off" onSubmit={submitHandler}>
        <TextInput
          content="Nazwa materiału"
          name="material-name"
          value={element.name}
          onChange={handleName}
        />
        <NumberInput
          content="Wartość"
          name="material-value"
          value={element.value}
          onChange={handleValue}
        />
        {project && (
          <Select
            key={element.unit}
            measurements={project.measurements}
            onChange={handleSelect}
            value={element.unit}
          />
        )}
        {project && project.price && (
          <NumberInput
            content="Cena"
            name="material-price"
            value={element.price}
            onChange={handlePrice}
          />
        )}
        <button>Dodaj</button>
      </form>
    </>
  );
};
