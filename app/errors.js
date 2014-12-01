import config from './config/environment';

export function logError(error) {
  Raven.captureException(error, {
    environment: config.environment
  });

  console.error(error);
}
