import * as z from 'zod';

import { nameValidation, emailValidation, passwordValidation } from 'src/validations/shared';

export const LoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginInterface = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: emailValidation,
});

export type ForgotPasswordInterface = z.infer<typeof ForgotPasswordSchema>;

export const SetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type SetPasswordInterface = z.infer<typeof SetPasswordSchema>;

export const createAdminSchema = () =>
  z.object({
    email: emailValidation,
    name: nameValidation,
  });

export type CreateAdminInterface = z.infer<ReturnType<typeof createAdminSchema>>;

export const editProfileSchema = () =>
  z.object({
    name: nameValidation,
  });

export type EditProfileInterface = z.infer<ReturnType<typeof editProfileSchema>>;

export const ChangePasswordSchema = () =>
  z
    .object({
      oldPassword: passwordValidation,
      newPassword: passwordValidation,
      confirmPassword: passwordValidation,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Password must match',
      path: ['confirmPassword'],
    });
