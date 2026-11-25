import { z } from 'zod';

export const RefreshSessionSchema = z.object({
    refreshToken: z
        .string({ error: 'El refresh token es requerido' })
        .trim()
        .min(1, 'El refresh token es requerido'),
});

export type RefreshSessionFormData = z.infer<typeof RefreshSessionSchema>;