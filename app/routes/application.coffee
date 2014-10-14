`import Ember from 'ember'`
`import config from '../config/environment'`

ApplicationRoute = Ember.Route.extend
  model: ->
    Ember.RSVP.hash
      currentUser: @store.find('user', 'me')

  actions:
    error: (error) ->
      if error.status == 401 || error.status == 404
        window.location.replace(config.APP.authUrl)
      else
        true

`export default ApplicationRoute`
