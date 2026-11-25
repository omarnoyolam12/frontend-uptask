import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshClient } from './refresh-client';
import { ApiError } from './api-error';

export const apiUpTask = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 1. Request: adjunta el access token desde memoria
apiUpTask.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. Refresh serializado: una sola petición en vuelo
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  refreshPromise ??= refreshClient
    .post('/auth/refresh')
    .then(({ data }) => {
      const token = data.data.accessToken;
      useAuthStore.getState().setAccessToken(token);
      return token;
    })
    .finally(() => { refreshPromise = null; });
  return refreshPromise;
};

// 3. Response: renueva ante 401 y normaliza los errores
type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };
const EXCLUDED_AUTH_ROUTES = ['/auth/login', '/auth/refresh'];

apiUpTask.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error: string }>) => {
    const original = error.config as RetryConfig | undefined;
    const isExcluded = EXCLUDED_AUTH_ROUTES.some((route) => original?.url?.startsWith(route));

    if (error.response?.status === 401 && original && !original._retry && !isExcluded) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return apiUpTask(original);
      } catch {
        useAuthStore.getState().logout(); // limpia store + queryClient.clear() + redirige
      }
    }

    return Promise.reject(
      new ApiError(
        error.response?.data?.error ?? 'Error de conexión',
        error.response?.status ?? 0,
      ),
    );
  },
);