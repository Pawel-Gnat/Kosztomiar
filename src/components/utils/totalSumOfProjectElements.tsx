import { Category } from '@/types/types';
import { sumValueOfProjectElements } from './sumValueOfProjectElements';

export const totalSumOfProjectElements = (props: Category[]) => {
  const arrayOfCategoryPrices: number[] = props.map((el) =>
    Number(sumValueOfProjectElements(el.elements)),
  );
  const totalCost = arrayOfCategoryPrices.reduce((a, b) => a + b, 0);
  return totalCost.toFixed(2);
};
