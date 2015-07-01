import Ember from 'ember';

var Fixtures = Ember.Object.extend({
  init: function() {
    this.server = new Pretender();

    this.server.unhandledRequest = function(verb, path, request) {
      console.log('------------');
      console.log('The following request was not handled');
      console.log(`${verb} ${path}`);
      console.log(request);
      console.log('------------');
    };

    this.handlers = {};
  },

  destroy: function() {
    this.server.shutdown();
  },

  define: function(method, url, fixture = {}) {
    _(fixture).defaults({
      params: {},
      request: null,
      response: {},
      status: 200
    });

    var handler = {
      fixture: fixture,
      called: false
    };

    var handlers = this.handlers[url];

    if(handlers == null) {
      handlers = [];

      this.server[method.toLowerCase()](
        `${EmberENV.apiBaseUrl}${url}`, function(request) {
          return this._handleRequest(url, request);
        }.bind(this)
      );
    }
    else {
      handlers = handlers.reject(function(handler_) {
        return _(handler_.fixture.params).isEqual(handler.fixture.params) &&
               _(handler_.fixture.request).isEqual(handler.fixture.request);
      });
    }

    this.handlers[url] = handlers;
    handlers.pushObject(handler);

    return handler;
  },

  _handleRequest: function(url, request) {
    var handlers = this.handlers[url];
    var parsedRequestBody = null;

    if(request.requestBody != null) {
      parsedRequestBody = JSON.parse(request.requestBody);
    }

    var requestHandler = handlers.find(function(handler) {
      var fixture = handler.fixture;

      if (_(fixture.params).isEqual(request.queryParams) &&
          _(fixture.request).isEqual(parsedRequestBody)) {
        return true;
      }
    });

    var response = null;

    if (requestHandler) {
      response = [
        requestHandler.fixture.status,
        { 'Content-Type': 'application/json' },
        JSON.stringify(requestHandler.fixture.response)
      ];

      Ember.Logger.log(`Stubbing request to ${url}:`);
      Ember.Logger.log(requestHandler.fixture);

      requestHandler.called = true;
    } else {
      Ember.Logger.log("Request made did not match any defined request fixtures. The issued request was:");
      Ember.Logger.log(request);
      Ember.Logger.log("And the issued request body was:");
      Ember.Logger.log(JSON.stringify(parsedRequestBody));
    }

    return response;
  }
});

Fixtures.reopenClass({
  EMPTY_IMAGE_URL: 'data:image/gif;base64,'
});

export default Fixtures;
