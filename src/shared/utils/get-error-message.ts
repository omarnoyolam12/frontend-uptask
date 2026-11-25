import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '../interfaces/api-response.interface';

const DEFAULT_MESSAGE = 'Ocurrió un error inesperado. Intenta de nuevo.';

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.error;
    if (typeof message === 'string' && message) return message;

    if (!error.response) return 'No se pudo conectar con el servidor.';
  }

  if (error instanceof Error && error.message) return error.message;

  return DEFAULT_MESSAGE;
};