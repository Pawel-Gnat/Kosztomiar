import { NotificationType } from '@/types/types';
import { useState } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    active: false,
    message: '',
    status: '',
  });

  const handleNotification = (result: NotificationType) => {
    setNotification({ active: true, message: result.message, status: result.status });
    setTimeout(() => {
      setNotification({ active: false, message: '', status: '' });
    }, 2500);
  };

  return { notification, handleNotification };
};
