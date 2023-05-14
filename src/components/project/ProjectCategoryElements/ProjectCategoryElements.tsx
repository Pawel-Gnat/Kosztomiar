import styles from './ProjectCategoryElement.module.css';
import { Element } from '@/types/types';

type Props = {
  currency: string | null;
  price: boolean;
  data: Element[];
};

export const ProjectCategoryElements = (props: Props) => {
  return (
    <>
      {props.data.map((el, index) => (
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
        </tr>
      ))}
    </>
  );
};
