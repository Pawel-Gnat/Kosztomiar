import { useContext, useState } from 'react';
import styles from './NewProjectForm.module.css';
import { Project } from '@/types/types';
import UserContext from '@/store/user-context';
import { getDate } from '@/components/utils/getDate';
import { createNewProject } from '@/components/utils/createNewProject';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { FiPlusSquare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Input, CheckboxInput, RadioInput } from '@/components/ui/Input/Input';

export default function NewProjectForm() {
  const [formData, setFormData] = useState<Project>({
    id: new Date().getTime().toString(),
    createdDate: getDate(),
    name: '',
    measurements: [],
    price: null,
    currency: null,
    data: [],
    isLoading: false,
  });

  const [error, setError] = useState({
    nameError: false,
    errorText: '',
    measurementError: false,
    priceError: false,
    currencyError: false,
  });

  const context = useContext(UserContext);
  const router = useRouter();

  function handlePriceSelection(value: string) {
    setFormData((prevState) => ({
      ...prevState,
      price: value === 'true' ? true : false,
    }));

    if (formData.price === false) {
      handleCurrencySelection(null);
    }
  }

  function handleName(value: string) {
    setFormData((prevState) => ({ ...prevState, name: value }));
  }

  function handleCurrencySelection(value: string | null) {
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

  function handleCancelButton() {
    clearForm();
    router.push('/kreator');
  }

  function redirectToNewProject(id: string) {
    router.push(`/kreator/${id}`);
  }

  function handleNameError() {
    if (formData.name === '') {
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

  function checkIfNameExists(projectName: string) {
    const existingNames: Project[] = context.projects;

    if (existingNames.find((project) => project.name === projectName)) {
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

  function handleMeasurementError() {
    if (formData.measurements.length === 0) {
      setError((prevState) => ({ ...prevState, measurementError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, measurementError: false }));
      }, 1500);
    }
  }

  function handlePriceError() {
    if (formData.price === null) {
      setError((prevState) => ({ ...prevState, priceError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, priceError: false }));
      }, 1500);
    }
  }

  function handleCurrencyError() {
    if (formData.price === true && formData.currency === null) {
      setError((prevState) => ({ ...prevState, currencyError: true }));

      setTimeout(() => {
        setError((prevState) => ({ ...prevState, currencyError: false }));
      }, 1500);
    }
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleNameError();
    handleMeasurementError();
    handlePriceError();
    handleCurrencyError();

    if (
      checkIfNameExists(formData.name) ||
      !formData.name ||
      !formData.measurements.length ||
      formData.price === null ||
      (formData.price === true && !formData.currency)
    ) {
      return;
    }

    await createNewProject(formData);
    context.setProjects();
    clearForm();
    redirectToNewProject(formData.id);
  }

  return (
    <form className={styles.form} autoComplete="off" onSubmit={submitHandler}>
      <Input
        type="text"
        content="Nazwa projektu"
        name="project-name"
        value={formData.name}
        onChange={handleName}
        error={error.nameError}
        errorText={error.errorText}
      />
      <div>
        <Text content="Wybierz jednostki miary:" />
        <CheckboxInput
          content="metry"
          value="m"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
        <CheckboxInput
          content="metry kwadratowe"
          value="m2"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
        <CheckboxInput
          content="metry sześcienne"
          value="m3"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
        <CheckboxInput
          content="kilogramy"
          value="kg"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
        <CheckboxInput
          content="litry"
          value="l"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
        <CheckboxInput
          content="sztuki"
          value="szt"
          onChange={handleMeasurements}
          error={error.measurementError}
        />
      </div>
      <div>
        <Text content="Uwzględniać ceny w projekcie?" />
        <RadioInput
          content="Tak"
          name="price"
          onChange={handlePriceSelection}
          value="true"
          error={error.priceError}
        />
        <RadioInput
          content="Nie"
          name="price"
          onChange={handlePriceSelection}
          value="false"
          error={error.priceError}
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
            error={error.currencyError}
          />
          <RadioInput
            content="EUR"
            name="currency"
            onChange={handleCurrencySelection}
            value="EUR"
            error={error.currencyError}
          />
          <RadioInput
            content="USD"
            name="currency"
            onChange={handleCurrencySelection}
            value="USD"
            error={error.currencyError}
          />
        </div>
      ) : null}
      <div className={styles.buttons}>
        <Button
          type="button"
          onClick={handleCancelButton}
          content="Anuluj"
          accent={false}
          isSmall={false}
        />
        <Button
          type="submit"
          icon={<FiPlusSquare />}
          content="Stwórz projekt"
          accent={true}
          isSmall={false}
        />
      </div>
    </form>
  );
}
