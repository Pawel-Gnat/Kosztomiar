import { Text } from '@/components/ui/Text/Text';
import styles from './Card.module.css';
import Image from 'next/image';
import { Card as CardType } from '@/types/types';

export const Card = (props: CardType) => {
  return (
    <div className={styles.card}>
      {props.img && (
        <Image
          src={props.img}
          width={200}
          height={250}
          alt=""
          aria-hidden={true}
          className={styles.image}
          priority
        />
      )}
      {props.svg}
      <div className={styles['text-container']}>
        <h2 className={styles.heading}>{props.heading}</h2>
        <Text content={props.text} />
      </div>
    </div>
  );
};
