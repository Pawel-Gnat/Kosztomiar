import styles from './Notification.module.css';
import { NotificationType } from '@/types/types';
import { createPortal } from 'react-dom';
import { Text } from '../Text/Text';

export const Notification = (props: NotificationType) => {
  const { message, status } = props;

  const backgroundColor = status === 'success' ? `${styles.success}` : `${styles.error}`;

  return createPortal(
    <div className={`${styles.container} ${backgroundColor}`}>
      <Text content={message} />
    </div>,
    document.getElementById('notifications') as HTMLElement,
  );
};
