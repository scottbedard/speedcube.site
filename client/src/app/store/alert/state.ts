import { ref } from 'vue';

/**
 * Alert
 */
export type Alert = {
  duration: number,
  id: number | string,
  message: string,
  timeoutKey: string,
  type: AlertType,
};

export type AlertType = 'danger' | 'default' | 'success';

/**
 * Alerts
 */
export const alerts = ref<Alert[]>([]);

/**
 * Pause alert timeouts
 */
export const alertTimeoutsPaused = ref(false);
