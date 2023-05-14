import styles from './ProjectCategory.module.css';
import { ProjectCategoryElements } from '../ProjectCategoryElements/ProjectCategoryElements';
import { NewCategoryElementForm } from '../NewCategoryElementForm/NewCategoryElementForm';
import { Category } from '@/types/types';
import { sumValueOfProjectElements } from '@/components/utils/sumValueOfProjectElements';

type Props = {
  name: string;
  currency: string | null;
  measurements: string[];
  price: boolean;
  data: Category[];
  key: number;
};

export const ProjectCategory = (props: Props) => {
  const { currency, name, price, data } = props;

  const filteredData = Array.from(data.filter((el) => el.category === name));
  const categoryName = data.find((el) => el.category === name);
  const categoryElements = filteredData[0].elements;

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
      {categoryName && <NewCategoryElementForm category={categoryName.category} />}
    </div>
  );
};
