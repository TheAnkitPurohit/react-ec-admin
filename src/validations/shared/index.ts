/* eslint-disable no-useless-escape */
import * as z from 'zod';

const upperCaseCapital = 'Please include at least one uppercase letter, symbol, or number';

export const nameValidation = z
  .string()
  .min(3, { message: 'Name must be at least 3 characters long' })
  .refine((data) => data.trim() !== '', { message: 'Name is required' });

export const emailValidation = z
  .string()
  .email('Email must be a valid email address')
  .refine((data) => data.trim() !== '', { message: 'Email is required' });

export const passwordValidation = z
  .string()
  .min(8, { message: upperCaseCapital })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: upperCaseCapital,
  });
