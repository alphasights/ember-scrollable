import config from '../config/environment';

export default {
  name: 'honeybadger',

  initialize: _(function() {
    Honeybadger.configure({
      api_key: EmberENV.honeybadgerApiKey,
      environment: config.environment
    });
  }).once()
};
