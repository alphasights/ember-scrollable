import config from '../../config/environment';
import Ember from 'ember';

Ember.Test.registerHelper('requestWatcher', function(app, method, url, params, body, response, status = 200) {
  var watcher = { called: false };

  app.server[method](`${EmberENV.apiBaseUrl}${url}`, function(request) {
    var requestBody = request.requestBody;

    if(requestBody != null) {
      requestBody = JSON.parse(requestBody);
    }

    if (_(params).isEqual(request.queryParams) &&
        _(body).isEqual(requestBody)) {
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
