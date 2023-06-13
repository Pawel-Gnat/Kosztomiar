export type Project = {
  id: string;
  createdDate: string;
  name: string;
  measurements: string[];
  price: boolean | null;
  currency: string | null;
  data: Category[];
  isLoading: boolean;
};

export type Category = {
  category: string;
  elements: Element[];
};

export type Element = {
  name: string;
  value: string;
  unit: string;
  price: string;
};

export type Card = {
  heading: string;
  text: string;
  img?: string;
  svg?: JSX.Element;
};

export type AccordionItem = {
  key: number;
  heading: string;
  text: string;
  isActive: boolean;
  setActiveIndex: (index: number | null) => void;
  indexItem: number;
};
