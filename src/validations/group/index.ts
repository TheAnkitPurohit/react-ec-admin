import { z } from 'zod';

export const createGroupSchema = () =>
  z.object({
    name: z.string().refine((data) => data.trim() !== '', { message: `Name is Required` }),
    order: z
      .number()
      .refine((data) => data.toString().trim() !== '', { message: `Order is Required` }),
  });
