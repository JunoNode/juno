type Alert = {
  message: string;
  type: string;
  token?: string;
  timestamp?: string;
};

const history: Alert[] = [];

export function logAlert(alert: Omit<Alert, "timestamp">) {
  history.push({ ...alert, timestamp: new Date().toISOString() });
}

export function exportHistory(): string {
  return JSON.stringify(history, null, 2);
}
