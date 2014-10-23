import config from '../../config/environment';
import Ember from 'ember';

Ember.Test.registerHelper('defineFixture', function(app, url, params, response) {
  window.app.server.get(`${config.APP.apiBaseUrl}${url}`, function(request) {
    if (_(params).isEqual(request.queryParams)) {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
    }
  });
});
