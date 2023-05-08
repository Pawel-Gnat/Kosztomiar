export type Project = {
  id: string;
  name: string;
  measurements: string[];
  price: boolean;
  currency: string | null;
  isLoading: boolean;
};
