import styles from './ProjectCategoryElements.module.css';
import { Button } from '@/components/ui/Button/Button';
import { EditedElement, Element } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';

type Props = {
  currency: string | null;
  price: boolean | null;
  data: Element[];
  deleteElement: (element: Element) => void;
  editElement: (element: EditedElement) => void;
};

export const ProjectCategoryElements = (props: Props) => {
  function deleteElementHandler(el: Element) {
    props.deleteElement(el);
  }

  function editElementHandler(el: Element) {
    props.editElement({ element: el, isEditing: true });
  }

  function sortAlphabetically(data: Element[]) {
    return data.sort((a, b) => {
      const firstElement = a.name.toLowerCase();
      const secondElement = b.name.toLowerCase();

      if (firstElement < secondElement) {
        return -1;
      }

      if (firstElement > secondElement) {
        return 1;
      }

      return 0;
    });
  }

  return (
    <>
      {sortAlphabetically(props.data).map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{el.name}</td>
          <td>{el.value}</td>
          <td>{el.unit}</td>
          {props.price && (
            <td>
              {+el.price && +el.price % 1 === 0 ? +el.price : (+el.price).toFixed(2)}{' '}
              {props.currency}
            </td>
          )}
          <td className={styles.nowrap}>
            <Button
              type="button"
              content="Edytuj"
              accent={false}
              isSmall={true}
              icon={<CiCircleMore />}
              onClick={() => editElementHandler(el)}
            />
            <Button
              type="button"
              content="Usuń"
              accent={false}
              isSmall={true}
              icon={<CiCircleRemove />}
              onClick={() => deleteElementHandler(el)}
            />
          </td>
        </tr>
      ))}
    </>
  );
};
