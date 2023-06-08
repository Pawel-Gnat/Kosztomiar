import styles from './Button.module.css';
import { ReactNode } from 'react';

type Button = {
  type: 'submit' | 'button';
  onClick?: () => void;
  icon?: ReactNode;
  isSmall: boolean;
  content: string;
  accent: boolean;
};

export const Button = (props: Button) => {
  const buttonClassName = props.accent
    ? `${styles.button} ${styles.accent}`
    : styles.button;

  return (
    <button
      className={props.isSmall ? `${styles.table} ${buttonClassName}` : buttonClassName}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon}
      <span>{props.content}</span>
    </button>
  );
};
