import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z
        .string({ error: 'El nombre es requerido' })
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(80, 'El nombre no puede exceder los 80 caracteres'),
    username: z
        .string({ error: 'El nombre de usuario es requerido' })
        .trim()
        .toLowerCase()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(20, 'El nombre de usuario no puede exceder los 20 caracteres')
        .regex(/^[a-z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),
    email: z
        .email('El email no tiene un formato válido')
        .trim()
        .toLowerCase(),
    password: z
        .string({ error: 'La contraseña es requerida' })
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z
        .string({ error: 'La confirmación de contraseña es requerida' })
        .min(1, 'Debes confirmar tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
    error: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;