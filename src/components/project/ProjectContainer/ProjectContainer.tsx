import styles from './ProjectContainer.module.css';
import { Category } from '@/types/types';
import { NewCategoryForm } from '../NewCategoryForm/NewCategoryForm';
import { ProjectCategory } from '../ProjectCategory/ProjectCategory';

type Props = {
  currency: string | null;
  measurements: string[];
  price: boolean;
  data: Category[];
  id: string;
};

export const ProjectContainer = (props: Props) => {
  const { id, currency, data, measurements, price } = props;
  const categoryInfo = { currency, measurements, price, data };

  return (
    <div className={styles.container}>
      {data.map((el, index) => (
        <ProjectCategory key={index} name={el.category} {...categoryInfo} id={id} />
      ))}
      <div className={styles['category-form']}>
        {/* <div> */}
        <NewCategoryForm />
      </div>
    </div>
  );
};
