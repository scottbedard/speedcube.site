import { Alert, alerts } from './state';
import { uniqueId } from 'lodash-es';

/**
 * Trigger an alert
 */
export function fireAlert(rawAlert: string | Partial<Alert>): void {
  if (typeof rawAlert === 'string') {
    rawAlert = {
      message: rawAlert,
    };
  }

  const timeoutKey = uniqueId();

  const alert: Alert = {
    duration: 2000,
    id: uniqueId(),
    message: '',
    timeoutKey,
    type: 'default',
    ...rawAlert,
  };

  alerts.value.push(alert);

  setTimeout(() => {
    timeoutAlert(timeoutKey);
  }, alert.duration);
}

/**
 * Pause timeouts.
 */
export function pauseTimeouts() {
  alerts.value.forEach((alert) => {
    alert.timeoutKey = '';
  });
}

/**
 * Resume timeouts.
 */
export function resumeTimeouts() {
  alerts.value.forEach((alert) => {
    const timeoutKey = uniqueId();

    setTimeout(() => {
      timeoutAlert(timeoutKey);
    }, alert.duration);

    alert.timeoutKey = timeoutKey;
  });
}

/**
 * Timeout an alert.
 */
export function timeoutAlert(timeout: string | null) {
  if (timeout) {
    const alertIndex = alerts.value.findIndex(alert => alert.timeoutKey === timeout);

    if (alertIndex > -1) {
      alerts.value.splice(alertIndex, 1);
    }
  }
}