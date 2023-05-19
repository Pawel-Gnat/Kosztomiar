import { useContext, useState } from 'react';
import styles from './NewProjectForm.module.css';
import { TextInput } from '@/components/ui/Input/TextInput/TextInput';
import { CheckboxInput } from '@/components/ui/Input/CheckboxInput/CheckboxInput';
import { RadioInput } from '@/components/ui/Input/RadioInput/RadioInput';
import { Project } from '@/types/types';
import UserContext from '@/store/user-context';
import { getDate } from '@/components/utils/getDate';
import { createNewProject } from '@/components/utils/createNewProject';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { FiPlusSquare } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function NewProjectForm() {
  const [formData, setFormData] = useState<Project>({
    id: new Date().getTime().toString(),
    createdDate: getDate(),
    name: '',
    measurements: [],
    price: false,
    currency: null,
    data: [],
    isLoading: false,
  });
  const context = useContext(UserContext);
  const router = useRouter();

  function handlePriceSelection(value: string) {
    setFormData((prevState) => ({
      ...prevState,
      price: value === 'true' ? true : false,
    }));
  }

  function handleName(value: string) {
    setFormData((prevState) => ({ ...prevState, name: value }));
  }

  function handleCurrencySelection(value: string) {
    setFormData((prevState) => ({ ...prevState, currency: value }));
  }

  function handleMeasurements(value: string) {
    if (formData.measurements.includes(value)) {
      setFormData((prevState) => ({
        ...prevState,
        measurements: formData.measurements.filter((item) => item !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        measurements: formData.measurements.concat(value),
      }));
    }
  }

  function clearForm() {
    setFormData((prevState) => ({
      ...prevState,
      id: new Date().getTime().toString(),
      name: '',
      createdDate: getDate(),
      measurements: [],
      price: false,
      currency: null,
      data: [],
      isLoading: false,
    }));
  }

  function handleFormButton() {
    clearForm();
    router.push('/kreator');
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createNewProject(formData);
    context.setProjects();
    handleFormButton();
  }

  return (
    <form className={styles.form} autoComplete="off" onSubmit={submitHandler}>
      <TextInput
        content="Nazwa projektu"
        name="project-name"
        value={formData.name}
        onChange={handleName}
      />
      <div>
        <Text content="Wybierz jednostki miary:" />
        <CheckboxInput content="metry" value="m" onChange={handleMeasurements} />
        <CheckboxInput
          content="metry kwadratowe"
          value="m2"
          onChange={handleMeasurements}
        />
        <CheckboxInput
          content="metry sześcienne"
          value="m3"
          onChange={handleMeasurements}
        />
        <CheckboxInput content="kilogramy" value="kg" onChange={handleMeasurements} />
        <CheckboxInput content="litry" value="l" onChange={handleMeasurements} />
        <CheckboxInput content="sztuki" value="szt" onChange={handleMeasurements} />
      </div>
      <div>
        <Text content="Uwzględniać ceny w projekcie?" />
        <RadioInput
          content="Tak"
          name="price"
          onChange={handlePriceSelection}
          value="true"
        />
        <RadioInput
          content="Nie"
          name="price"
          onChange={handlePriceSelection}
          value="false"
        />
      </div>

      {formData.price ? (
        <div>
          <Text content="Wybierz walutę" />
          <RadioInput
            content="PLN"
            name="currency"
            onChange={handleCurrencySelection}
            value="PLN"
          />
          <RadioInput
            content="EUR"
            name="currency"
            onChange={handleCurrencySelection}
            value="EUR"
          />
          <RadioInput
            content="USD"
            name="currency"
            onChange={handleCurrencySelection}
            value="USD"
          />
        </div>
      ) : null}
      <div className={styles.buttons}>
        <Button
          type="button"
          onClick={handleFormButton}
          content="Anuluj"
          accent={false}
        />
        <Button
          type="submit"
          icon={<FiPlusSquare />}
          content="Stwórz projekt"
          accent={true}
        />
      </div>
    </form>
  );
}
