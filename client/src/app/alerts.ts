import { ref } from 'vue'

/**
 * Alert
 */
export type Alert = {
  text: string
  type: 'failed' | 'success'
}

/**
 * Alerts
 */
const alerts = ref<Alert[]>([])

/**
 * Dispatch an alert
 */
export function alert(obj: Partial<Alert>) {
  const normalizedAlert: Alert = {
    text: '',
    type: 'success',
    ...obj,
  }

  alerts.value.push(normalizedAlert)

  setTimeout(() => {
    alerts.value.splice(alerts.value.indexOf(normalizedAlert), 1)
  }, 5000)
}

/**
 * Use alerts
 */
export function useAlerts() {
  return {
    alerts
  }
}
