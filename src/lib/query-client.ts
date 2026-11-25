import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,        // 1 min: el dato se considera fresco y no se vuelve a pedir
      gcTime: 1000 * 60 * 5,       // 5 min: cuánto vive en caché sin componentes que lo usen
      retry: 1,                    // reintentos ante error (por defecto son 3)
      refetchOnWindowFocus: false, // ajústalo según tu caso; por defecto es true
    },
  },
})