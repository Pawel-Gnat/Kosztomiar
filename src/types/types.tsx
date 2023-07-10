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

export type Modal = {
  active?: boolean;
  type: string;
  name: string;
  handleCancel?: () => void;
  handleDelete?: () => void;
};

export type InputType = 'text' | 'number' | 'email' | 'password';

export type Login = {
  email: string;
  password: string;
};

export type Register = Login & {
  name: string;
  passwordValidation: string;
};

export type AuthError = {
  text: string | undefined;
  type: string;
};

export interface LoadingContextType {
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface RegisterFormType {
  setIsLogin: (setIsLogin: boolean) => void;
}
