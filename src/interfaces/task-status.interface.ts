export const TASK_STATUSES = [
  'pending',
  'on_hold',
  'in_progress',
  'in_review',
  'completed',
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  on_hold: 'En espera',
  in_progress: 'En progreso',
  in_review: 'En revisión',
  completed: 'Completado',
};
