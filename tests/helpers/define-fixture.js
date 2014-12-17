import config from '../../config/environment';
import Ember from 'ember';

Ember.Test.registerHelper('defineFixture', function(app, url, params, response, status = 200) {
  app.server.get(`${window.EmberENV.apiBaseUrl}${url}`, function(request) {
    if (_(params).isEqual(request.queryParams)) {
      return [status, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
    }
  });
});
