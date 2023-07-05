import { checkIfCategoryNameExists } from '@/utils/checkIfNameExists';
import { removeExcessWhitespaces } from '@/utils/removeExcessWhitespaces';
import { Project } from '@/types/types';
import { string, z } from 'zod';

export const NewCategoryFormSchema = (project: Project) =>
  z.object({
    category: string()
      .transform((val) => val.trimStart())
      .transform((val) => removeExcessWhitespaces(val))
      .refine((value) => value.length > 0, {
        message: 'Wpisz nazwę',
      })
      .refine((value) => !checkIfCategoryNameExists(project, value), {
        message: 'Nazwa już istnieje',
      }),
  });
