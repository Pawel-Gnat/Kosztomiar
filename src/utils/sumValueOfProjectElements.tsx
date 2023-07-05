import { Element } from '@/types/types';

export const sumValueOfProjectElements = (props: Element[]) => {
  const arrayOfPrices: number[] = props.map((el) => +el.value * +el.price);
  const totalCost = arrayOfPrices.reduce((a, b) => a + b, 0);
  return totalCost.toFixed(2);
};
