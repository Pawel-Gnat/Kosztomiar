import styles from './ProjectCategory.module.css';
import { ProjectCategoryElements } from '../ProjectCategoryElements/ProjectCategoryElements';
import { NewCategoryElementForm } from '../NewCategoryElementForm/NewCategoryElementForm';
import { Category, Element, FormElement } from '@/types/types';
import { sumValueOfProjectElements } from '@/utils/sumValueOfProjectElements';
import { deleteCategoryElement } from '@/utils/deleteUtils';
import { FC, useContext, useState } from 'react';
import { UserContext } from '@/store/user-context';
import { FieldValues, useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewElementFormSchema } from '@/schemas/NewElementFormSchema';
import { useProject } from '@/hooks/useProject';
import { createNewCategoryElement } from '@/utils/createUtils';
import { LoadingContext } from '@/store/loading-context';
import { useSession } from 'next-auth/react';

type Props = {
  name: string;
  currency: string | null;
  measurements: string[];
  price: string | null;
  data: Category[];
  key: number;
  id: string;
};

const INITIAL_EDITED_ELEMENT_STATE: Element = {
  name: '',
  value: 0,
  unit: '',
  price: 0,
};

const INITIAL_IS_FORM_ACTIVE_STATE = {
  isActive: false,
  isEditing: false,
};

const FORM_DEFAULT_VALUES = {
  name: '',
  value: 0,
  unit: [''],
  price: '0',
};

export const ProjectCategory: FC<Props> = ({ name, currency, price, data, id }) => {
  const { data: session, status } = useSession();
  const { loading, setIsLoading } = useContext(LoadingContext);
  const context = useContext(UserContext);
  const project = useProject()!;
  const [isFormActive, setIsFormActive] = useState(INITIAL_IS_FORM_ACTIVE_STATE);
  const [editedElement, setEditedElement] = useState(INITIAL_EDITED_ELEMENT_STATE);

  const filteredData = Array.from(data.filter((el) => el.category === name));
  const categoryName = data.find((el) => el.category === name)!;
  const categoryElements = filteredData[0].elements;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormElement>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: zodResolver(NewElementFormSchema(project, categoryName)),
  });

  const { field } = useController({ name: 'unit', control });

  const deleteElement = async (element: Element) => {
    await deleteCategoryElement(id, categoryName.category, element, session);
    context.setProjects();
  };

  const submitHandler = async (formValues: FieldValues) => {
    setIsLoading(true);
    if (isFormActive.isEditing) {
      await deleteCategoryElement(id, categoryName.category, editedElement, session);

      setEditedElement((prevState) => ({
        ...prevState,
        ...INITIAL_EDITED_ELEMENT_STATE,
      }));
    }

    await createNewCategoryElement(
      project.id,
      categoryName.category,
      formValues as Element,
      session,
    );
    setIsLoading(false);
    reset((prevState) => ({
      ...prevState,
      ...FORM_DEFAULT_VALUES,
    }));
    setIsFormActive((prevState) => ({ ...prevState, ...INITIAL_IS_FORM_ACTIVE_STATE }));
    context.setProjects();
  };

  return (
    <div>
      <table className={styles.table}>
        <caption>{name}</caption>
        <thead>
          <tr>
            <th>Lp.</th>
            <th className={styles.full}>Nazwa</th>
            <th>Ilość</th>
            <th>J.m.</th>
            {price === 'true' && <th>Cena</th>}
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          <ProjectCategoryElements
            data={categoryElements}
            currency={currency}
            price={price}
            deleteElement={deleteElement}
            setIsFormActive={setIsFormActive}
            setEditedElement={setEditedElement}
            reset={reset}
          />
        </tbody>
        <tfoot className={styles.footer}>
          {price === 'true' && (
            <tr>
              <td colSpan={4} className={styles['right-align']}>
                Suma:
              </td>
              <td className={styles.nowrap}>
                {sumValueOfProjectElements(categoryElements)} {currency}
              </td>
            </tr>
          )}
        </tfoot>
      </table>
      <div className={styles['new-element-container']}>
        <NewCategoryElementForm
          onSubmit={handleSubmit(submitHandler)}
          error={errors}
          register={register}
          control={control}
          field={field}
          reset={reset}
          setIsFormActive={setIsFormActive}
          isFormActive={isFormActive.isActive}
          loading={loading}
        />
      </div>
    </div>
  );
};
