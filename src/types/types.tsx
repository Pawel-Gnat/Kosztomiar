import { Session } from 'next-auth';
import { ReactNode } from 'react';

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

export interface Card {
  heading: string;
  text: string;
  img?: string;
  svg?: JSX.Element;
}

export interface AccordionItem {
  key: number;
  heading: string;
  text: string;
  isActive: boolean;
  setActiveIndex: (index: number | null) => void;
  indexItem: number;
}
export interface Modal {
  active?: boolean;
  type: string;
  name: string;
  handleCancel?: () => void;
  handleDelete?: () => void;
}

export type InputType = 'text' | 'number' | 'email' | 'password';

export type Button = {
  type: 'submit' | 'button';
  ariaLabel?: string;
  ariaExpanded?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  isSmall: boolean;
  content: string | JSX.Element;
  accent: boolean;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = Login & {
  name: string;
  passwordValidation: string;
};

export type Password = {
  currentPassword: string;
  newPassword: string;
};

export interface Response {
  text: string | undefined;
  type: string;
}

export interface LoadingContextType {
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface UserContextType {
  isUserLoggedIn: boolean;
  projects: Project[];
  setProjects: () => {};
}

export interface RegisterFormType {
  setIsLogin: (setIsLogin: boolean) => void;
}

export interface NotificationType {
  message: string;
  status: string;
}

export type UserSession = Session | null;
