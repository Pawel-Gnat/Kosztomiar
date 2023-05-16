import styles from './ProjectCategory.module.css';
import { ProjectCategoryElements } from '../ProjectCategoryElements/ProjectCategoryElements';
import { NewCategoryElementForm } from '../NewCategoryElementForm/NewCategoryElementForm';
import { Category, Element } from '@/types/types';
import { sumValueOfProjectElements } from '@/components/utils/sumValueOfProjectElements';
import { deleteCategoryElement } from '@/components/utils/deleteCategoryElement';
import { useContext, useState } from 'react';
import UserContext from '@/store/user-context';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';

type Props = {
  name: string;
  currency: string | null;
  measurements: string[];
  price: boolean;
  data: Category[];
  key: number;
  id: string;
};

export const ProjectCategory = (props: Props) => {
  const { currency, name, price, data } = props;
  const context = useContext(UserContext);
  const [editedElement, setEditedElement] = useState<Element | null>(null);

  const filteredData = Array.from(data.filter((el) => el.category === name));
  const categoryName = data.find((el) => el.category === name)!;
  const categoryElements = filteredData[0].elements;

  async function deleteElement(element: Element) {
    await deleteCategoryElement(props.id, categoryName.category, element);
    context.setProjects();
  }

  async function editElement(element: Element) {
    setEditedElement(element);
  }

  return (
    <div>
      <table>
        <caption>{name}</caption>
        <thead>
          <tr>
            <th>L.p.</th>
            <th>Nazwa</th>
            <th>Wartość</th>
            <th>J.m.</th>
            {price && <th>Cena</th>}
          </tr>
        </thead>
        <tbody>
          <ProjectCategoryElements
            data={categoryElements}
            currency={currency}
            price={price}
            deleteElement={deleteElement}
            editElement={editElement}
          />
        </tbody>
        <tfoot>
          {price && (
            <tr>
              <td colSpan={4}>Suma</td>
              <td>
                {sumValueOfProjectElements(categoryElements)} {currency}
              </td>
            </tr>
          )}
        </tfoot>
      </table>
      <NewCategoryElementForm
        category={categoryName.category}
        editedElement={editedElement}
      />
    </div>
  );
};
