import { Notification } from '@/components/ui/Notification/Notification';
import { NotificationType } from '@/types/types';
import { FC, ReactNode, createContext, useState } from 'react';

export const NotificationContext = createContext({
  handleNotification: (result: NotificationType) => {},
});

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <NotificationContext.Provider
      value={{
        handleNotification: handleNotification,
      }}
    >
      {children}

      {notification.active && (
        <Notification message={notification.message} status={notification.status} />
      )}
    </NotificationContext.Provider>
  );
};
