import styles from './Text.module.css';

export const Text = (props: { content: string }) => {
  return <p className={styles.text}>{props.content}</p>;
};

export const H1 = (props: { content: string }) => {
  return <h1 className={styles.heading}>{props.content}</h1>;
};
