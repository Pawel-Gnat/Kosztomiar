import { Text } from '@/components/ui/Text/Text';
import styles from './Card.module.css';
import Image from 'next/image';
import { Card as CardType } from '@/types/types';

export const Card = (props: CardType) => {
  return (
    <div className={styles.card}>
      {props.img && (
        <div data-aos="fade-up" data-aos-delay="200">
          <Image
            src={props.img}
            width={200}
            height={250}
            alt=""
            aria-hidden={true}
            className={styles.image}
            priority
          />
        </div>
      )}
      {props.svg && (
        <div className={styles.svg} data-aos="fade-up" data-aos-delay="200">
          {props.svg}
        </div>
      )}
      <div className={styles['text-container']} data-aos="fade-up" data-aos-delay="300">
        <h2 className={styles.heading}>{props.heading}</h2>
        <Text content={props.text} />
      </div>
    </div>
  );
};
