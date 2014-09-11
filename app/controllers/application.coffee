`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  isSearching: false

  actions:
    toggleSearch: ->
      @set('isSearching', !@get('isSearching'))

`export default ApplicationController`
