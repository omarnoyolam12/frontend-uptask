import { z } from "zod";

export const ConfirmAccountSchema = z.object({
    email: z
        .email('El email no tiene un formato válido')
        .trim()
        .toLowerCase(),
    code: z
        .string({ error: 'El código es requerido' })
        .trim()
        .regex(/^\d{6}$/, 'El código debe tener exactamente 6 dígitos'),
});

export type ConfirmAccountFormData = z.infer<typeof ConfirmAccountSchema>;