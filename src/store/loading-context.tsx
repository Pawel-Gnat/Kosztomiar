import { LoadingContextType } from '@/types/types';
import { createContext, useState } from 'react';

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setIsLoading: () => {},
});

export const LoadingProvider = (props: { children: React.ReactNode }) => {
  const [loading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
