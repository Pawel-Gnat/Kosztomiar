import styles from './Buttom.module.css';
import { ReactNode } from 'react';

type Button = {
  type: 'submit' | 'button';
  onClick?: () => void;
  icon?: ReactNode;
  content: string;
  accent: boolean;
};

export const Button = (props: Button) => {
  const buttonClassName = props.accent
    ? `${styles.button} ${styles.accent}`
    : styles.button;

  return (
    <button className={buttonClassName} type={props.type} onClick={props.onClick}>
      {props.icon}
      {props.content}
    </button>
  );
};
