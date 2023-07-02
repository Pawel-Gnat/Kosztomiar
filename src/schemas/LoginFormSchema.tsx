import { removeExcessWhitespaces } from '@/components/utils/removeExcessWhitespaces';
import { string, z } from 'zod';

export const LoginFormSchema = () =>
  z.object({
    email: string()
      .transform((val) => val.trimStart())
      .transform((val) => removeExcessWhitespaces(val))
      .refine((value) => value.length > 0, {
        message: 'Podaj adres e-mail',
      }),
    password: string()
      .transform((val) => val.trimStart())
      .transform((val) => removeExcessWhitespaces(val))
      .refine((value) => value.length > 0, {
        message: 'Podaj hasło',
      }),
  });
