`import Ember from 'ember'`
`import config from 'phoenix/config/environment'`

ApplicationRoute = Ember.Route.extend
  model: ->
    @store.find('user', 'me')

  actions:
    error: (error) ->
      if error.status == 401
        window.location.replace(config.APP.authURL)
      else
        true

`export default ApplicationRoute`
