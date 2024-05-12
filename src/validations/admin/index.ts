import * as z from 'zod';

import { nameValidation, emailValidation } from 'src/validations/shared';

export const createAdminSchema = () =>
  z.object({
    email: emailValidation,
    name: nameValidation,
  });

export type CreateAdminInterface = z.infer<ReturnType<typeof createAdminSchema>>;
