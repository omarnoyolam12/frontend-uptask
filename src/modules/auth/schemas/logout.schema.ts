import { z } from 'zod';

export const LogoutSchema = z.object({
    refreshToken: z
        .string({ error: 'El refresh token es requerido' })
        .trim()
        .min(1, 'El refresh token es requerido'),
});

export type LogoutFormData = z.infer<typeof LogoutSchema>;