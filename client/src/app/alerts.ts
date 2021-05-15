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
  alerts.value.push({
    text: '',
    type: 'success',
    ...obj,
  })

  setTimeout(() => {
    alerts.value.splice(alerts.value.indexOf(obj), 1)
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
