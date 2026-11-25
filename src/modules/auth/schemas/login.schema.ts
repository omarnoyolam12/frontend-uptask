import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .email('El email no tiene un formato válido')
        .trim()
        .toLowerCase(),
    password: z
        .string({ error: 'La contraseña es requerida' })
        .min(1, 'La contraseña es requerida'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;