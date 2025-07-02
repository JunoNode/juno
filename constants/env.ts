export const ENVIRONMENT_FLAGS = {
  enableDevPanel: process.env.NODE_ENV === 'development',
  enableTestSignals: process.env.NODE_ENV !== 'production',
  showExperimentalTimeline: false,
};