import config from './config/environment';

export default function (error) {
  Raven.captureException(error, {
    environment: config.environment
  });

  console.error(error);
}
