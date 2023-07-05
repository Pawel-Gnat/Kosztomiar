import { checkIfElementNameExists } from '@/utils/checkIfNameExists';
import { removeExcessWhitespaces } from '@/utils/removeExcessWhitespaces';
import { Category, Project } from '@/types/types';
import { string, z } from 'zod';

export const NewElementFormSchema = (project: Project, categoryName: Category) =>
  z.object({
    name: string()
      .transform((val) => val.trimStart())
      .transform((val) => removeExcessWhitespaces(val))
      .refine((value) => value.length > 0, {
        message: 'Wpisz nazwę',
      }),
    // .refine((value) => !checkIfElementNameExists(project, categoryName, value), {
    //   message: 'Nazwa już istnieje',
    // }),
    value: string()
      .transform((val) => parseFloat(val))
      .refine((value) => value > 0),
    unit: string().nonempty(),
    price: string()
      .transform((val) => parseFloat(val))
      .refine((value) => value >= 0),
  });
