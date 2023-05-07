import { useState } from 'react';
import styles from './NewProjectForm.module.css';
import { TextInput } from '@/components/ui/Input/TextInput/TextInput';
import { CheckboxInput } from '@/components/ui/Input/CheckboxInput/CheckboxInput';
import { RadioInput } from '@/components/ui/Input/RadioInput/RadioInput';

type Project = {
  // id: string;
  name: string;
  measurements: string[];
  price: boolean;
  currency: string | null;
  isLoading: boolean;
};

export default function NewProjectForm() {
  const [formData, setFormData] = useState<Project>({
    // id: new Date().getTime().toString(),
    name: '',
    measurements: [],
    price: false,
    currency: null,
    isLoading: false,
  });

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

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form className={styles.form} autoComplete="off" onSubmit={submitHandler}>
      <div>
        <TextInput
          content="Nazwa projektu"
          name="project-name"
          value={formData.name}
          onChange={handleName}
        />
      </div>
      <div>
        <p>Wybierz jednostki miary: </p>
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
        <p>Uwzględniać ceny w projekcie? </p>
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
          <p>Wybierz walutę</p>
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
      <button>Stwórz projekt</button>
    </form>
  );
}
