import { ref } from 'vue'

/**
 * Alert
 */
export type Alert = {
  text: string
  type: 'danger' | 'success'
}

/**
 * Alerts
 */
const alerts = ref<Alert[]>([])

/**
 * Dispatch an alert
 */
export function alert(obj: Alert) {
  alerts.value.push(obj)

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
