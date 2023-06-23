export type FormProject = {
  name: string;
  units: string[] | null;
  price: string;
  currency: string;
};

export type FormCategory = {
  category: string;
};

export type FormElement = {
  name: string;
  value: number | null;
  unit: string[];
  price: string;
};

export type Project = {
  id: string;
  name: string;
  currency: string | null;
  measurements: string[];
  price: string | null;
  data: Category[];
  createdDate: string;
};

export type Category = {
  category: string;
  elements: Element[];
};

export type Element = {
  name: string;
  value: number;
  unit: string;
  price: number;
};

export type EditedElement = {
  element: Element;
  isEditing: boolean;
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
