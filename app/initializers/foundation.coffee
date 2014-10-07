FoundationInitializer =
  name: 'foundation'

  initialize: ->
    Ember.View.reopen
      onDidInsertElement: (->
        Ember.run.scheduleOnce('afterRender', this, @initializeFoundation)
      ).on('didInsertElement')

      initializeFoundation: ->
        Ember.$(document).foundation()

`export default FoundationInitializer`
