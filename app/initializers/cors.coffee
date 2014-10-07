`import Ember from 'ember'`

CorsInitializer =
  name: 'cors'

  initialize: ->
    Ember.$.ajaxPrefilter (options) ->
      options.crossDomain = true
      options.xhrFields = { withCredentials: true }
      options.headers = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }

`export default CorsInitializer`
