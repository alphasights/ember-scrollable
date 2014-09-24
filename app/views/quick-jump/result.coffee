`import Ember from 'ember';`

ResultView = Ember.View.extend
  classNameBindings: ['type']
  type: Ember.computed.alias('controller.type')

  templateName: (->
    type = @get('type')

    if type?
      "views/quick-jump/#{type}"
    else
      null
  ).property('type')

`export default ResultView;`
