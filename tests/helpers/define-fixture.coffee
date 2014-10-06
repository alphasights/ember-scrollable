Ember.Test.registerHelper 'defineFixture', (app, url, params, response) ->
  app.server.get("/swordfish#{url}", (request) ->
    if _(params).isEqual(request.queryParams)
      [200, "Content-Type": "application/json", JSON.stringify(response)]
  )
