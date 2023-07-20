import { useContext } from 'react';
import styles from './NewProjectForm.module.css';
import { UserContext } from '@/store/user-context';
import { getDate } from '@/utils/getDate';
import { createNewProject } from '@/utils/createUtils';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { FiPlusSquare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Input, CheckboxInput, RadioInput } from '@/components/ui/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProjectFormSchema } from '@/schemas/NewProjectFormSchema';
import { FormProject } from '@/types/types';
import { useSession } from 'next-auth/react';
import { LoadingContext } from '@/store/loading-context';
import { Loader } from '@/components/loader/Loader';
import { NotificationContext } from '@/store/notification-context';

const UNITS = [
  { content: 'metry', value: 'm' },
  { content: 'metry kwadratowe', value: 'm2' },
  { content: 'metry sześcienne', value: 'm3' },
  { content: 'kilogramy', value: 'kg' },
  { content: 'litry', value: 'l' },
  { content: 'sztuki', value: 'szt' },
];
const PRICES = [true, false];
const CURRENCIES = ['PLN', 'EUR', 'USD'];

export const NewProjectForm = () => {
  const { data: session, status } = useSession();
  const context = useContext(UserContext);
  const { loading, setIsLoading } = useContext(LoadingContext);
  const { handleNotification } = useContext(NotificationContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProject>({
    defaultValues: {
      name: '',
      units: null,
      price: 'false',
      currency: 'PLN',
    },
    resolver: zodResolver(NewProjectFormSchema(context.projects)),
  });
  const showCurrencies = watch('price');

  const redirectToNewProject = (id: string) => {
    router.push(`/kreator/${id}`);
  };

  const setProjectValues = (values: FieldValues) => {
    const data = {
      id: new Date().getTime().toString(),
      createdDate: getDate(),
      name: values.name,
      measurements: values.units,
      price: values.price,
      currency: values.currency,
      data: [],
    };

    return data;
  };

  const submitHandler = async (formValues: FieldValues) => {
    setIsLoading(true);
    const data = setProjectValues(formValues);
    await createNewProject(data, session);
    context.setProjects();
    handleNotification({ message: 'Utworzono nowy projekt', status: 'success' });
    setIsLoading(false);
    redirectToNewProject(data.id);
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        type="text"
        content="Nazwa projektu"
        name="name"
        error={errors.name}
        register={register}
      />
      <div>
        <Text content="Wybierz jednostki miary:" />
        {UNITS.map((unit, index) => (
          <CheckboxInput
            key={index}
            content={unit.content}
            name="units"
            value={unit.value}
            error={errors.units}
            register={register}
          />
        ))}
      </div>
      <div>
        <Text content="Uwzględniać ceny w projekcie?" />
        {PRICES.map((input, index) => (
          <RadioInput
            key={index}
            content={input ? 'Tak' : 'Nie'}
            name="price"
            value={input.toString()}
            error={errors.price}
            register={register}
          />
        ))}
      </div>

      {showCurrencies === 'true' && (
        <div>
          <Text content="Wybierz walutę" />
          {CURRENCIES.map((currency, index) => (
            <RadioInput
              key={index}
              content={currency}
              name="currency"
              value={currency}
              register={register}
            />
          ))}
        </div>
      )}
      <div className={styles.buttons}>
        <Button
          type="button"
          onClick={() => router.push('/kreator')}
          content="Anuluj"
          accent={false}
          isSmall={false}
        />
        <Button
          type="submit"
          icon={!loading && <FiPlusSquare />}
          content={loading ? <Loader /> : 'Stwórz projekt'}
          accent={true}
          isSmall={false}
        />
      </div>
    </form>
  );
};
