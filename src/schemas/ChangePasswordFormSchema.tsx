import { removeExcessWhitespaces } from '@/utils/removeExcessWhitespaces';
import { string, z } from 'zod';

export const ChangePasswordFormSchema = () =>
  z
    .object({
      currentPassword: string()
        .transform((val) => val.trimStart())
        .transform((val) => removeExcessWhitespaces(val))
        .refine((value) => value.length > 0, {
          message: 'Uzupełnij dane',
        }),
      newPassword: string()
        .transform((val) => val.trimStart())
        .transform((val) => removeExcessWhitespaces(val))
        .refine((value) => value.length > 0, {
          message: 'Uzupełnij dane',
        }),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: 'Hasła są identyczne',
      path: ['newPassword'],
    });
