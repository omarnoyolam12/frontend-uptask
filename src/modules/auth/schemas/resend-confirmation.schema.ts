import { z } from 'zod';

export const ResendConfirmationSchema = z.object({
    email: z
        .email('El email no tiene un formato válido')
        .trim()
        .toLowerCase(),
});

export type ResendConfirmationFormData = z.infer<typeof ResendConfirmationSchema>;