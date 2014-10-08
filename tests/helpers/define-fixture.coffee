`import config from '../../config/environment'`

Ember.Test.registerHelper 'defineFixture', (app, url, params, response) ->
  app.server.get("#{config.APP.apiBaseURL}#{url}", (request) ->
    if _(params).isEqual(request.queryParams)
      [200, 'Content-Type': 'application/json', JSON.stringify(response)]
  )
