import { Element } from '@/types/types';

export const sortElementsAlphabetically = (data: Element[]) => {
  return data.sort((a, b) => {
    const firstElement = a.name.toLowerCase();
    const secondElement = b.name.toLowerCase();

    if (firstElement < secondElement) {
      return -1;
    }

    if (firstElement > secondElement) {
      return 1;
    }

    return 0;
  });
};
