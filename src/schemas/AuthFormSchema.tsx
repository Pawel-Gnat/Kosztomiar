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

export const RegisterFormSchema = () =>
  z
    .object({
      name: string()
        .transform((val) => val.trimStart())
        .transform((val) => removeExcessWhitespaces(val))
        .refine((value) => value.length > 0, {
          message: 'Podaj swoje imię',
        }),
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
      passwordValidation: string()
        .transform((val) => val.trimStart())
        .transform((val) => removeExcessWhitespaces(val))
        .refine((value) => value.length > 0, {
          message: 'Podaj poprawne hasło',
        }),
    })
    .refine((data) => data.password == data.passwordValidation, {
      message: 'Hasła nie są identyczne',
      path: ['passwordValidation'],
    });
