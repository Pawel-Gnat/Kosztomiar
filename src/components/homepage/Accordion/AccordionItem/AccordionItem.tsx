import styles from './AccordionItem.module.css';
import { Text } from '@/components/ui/Text/Text';
import { AccordionItem as AccordionItemType } from '@/types/types';
import { CiCircleChevUp } from 'react-icons/ci';

export const AccordionItem = (props: AccordionItemType) => {
  const toggleItem = () => {
    const nextIndex = props.isActive ? null : props.indexItem;
    props.setActiveIndex(nextIndex);
  };

  return (
    <div className={styles.item}>
      <h3
        className={props.isActive ? `${styles.heading} ${styles.rotate}` : styles.heading}
      >
        <button onClick={toggleItem} aria-expanded={props.isActive}>
          {props.heading}
          <CiCircleChevUp />
        </button>
      </h3>
      <div
        className={props.isActive ? `${styles.text} ${styles.show}` : styles.text}
        aria-hidden={!props.isActive}
      >
        <Text content={props.text} />
      </div>
    </div>
  );
};
