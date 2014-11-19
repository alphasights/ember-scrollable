import config from '../../config/environment';
import Ember from 'ember';

Ember.Test.registerHelper('requestWatcher', function(app, method, url, params, body, response, status = 200) {
  var watcher = { called: false };

  app.server[method](`${config.APP.apiBaseUrl}${url}`, function(request) {
    if (_(params).isEqual(request.queryParams) &&
        _(body).isEqual(JSON.parse(request.requestBody))) {
      watcher.called = true;
      
      return [
        status,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
      ];
    }
  });

  return watcher;
});
