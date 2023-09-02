import { Button as ButtonType } from '@/types/types';
import styles from './Button.module.css';

export const Button = (props: ButtonType) => {
  const buttonClassName = props.accent
    ? `${styles.button} ${styles.accent}`
    : styles.button;

  return (
    <button
      className={props.isSmall ? `${styles.table} ${buttonClassName}` : buttonClassName}
      type={props.type}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      aria-expanded={props.ariaExpanded}
    >
      {props.icon}
      {props.content}
    </button>
  );
};
