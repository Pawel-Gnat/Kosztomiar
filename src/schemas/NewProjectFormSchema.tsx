import { checkIfProjectNameExists } from '@/utils/checkIfNameExists';
import { removeExcessWhitespaces } from '@/utils/removeExcessWhitespaces';
import { Project } from '@/types/types';
import { array, string, z } from 'zod';

export const NewProjectFormSchema = (projects: Project[]) =>
  z.object({
    name: string()
      .transform((val) => val.trimStart())
      .transform((val) => removeExcessWhitespaces(val))
      .refine((value) => value.length > 0, {
        message: 'Wpisz nazwę',
      })
      .refine((value) => !checkIfProjectNameExists(projects, value), {
        message: 'Nazwa już istnieje',
      }),
    units: array(string()).nonempty(),
    price: string(),
    currency: string(),
  });
