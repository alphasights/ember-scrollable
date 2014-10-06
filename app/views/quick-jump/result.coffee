`import Ember from 'ember'`

ResultView = Ember.View.extend
  classNameBindings: ['type']
  availableTypes: ['project']

  type: (->
    type = @get('controller.type')

    if type? && @get('availableTypes').contains(type)
      type
    else
      'default'
  ).property('controller.type')

  templateName: (->
    "views/quick-jump/#{@get('type')}"
  ).property('type')

`export default ResultView`
