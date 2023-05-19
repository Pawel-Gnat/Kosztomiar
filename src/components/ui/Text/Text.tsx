import styles from './Text.module.css';

type Text = {
  content: string;
};

export const Text = (props: Text) => {
  return <p className={styles.text}>{props.content}</p>;
};
