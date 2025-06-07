// Deep recursion + exception mastery
export const withErrorBoundary = <T>(fn: () => T, checkpoint: string): T => {
  try {
    performance.mark(`${checkpoint}-start`);
    const result = fn();
    performance.mark(`${checkpoint}-end`);
    return result;
  } catch (error) {
    console.error(`[${checkpoint}] Error:`, error);
    // Telemetry to your monitoring service
    fetch('/api/telemetry', { method: 'POST', body: JSON.stringify({ checkpoint, error: error.message }) });
    throw error;
  }
};