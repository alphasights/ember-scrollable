`import Ember from 'ember';`

ApplicationRoute = Ember.Route.extend
  model: ->
    @store.find('user', 'me')

  actions:
    error: (error) ->
      if error.status == 401
        window.location.replace(PhoenixENV.APP.authURL)
      else
        true

`export default ApplicationRoute;`
