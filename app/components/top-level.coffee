`import Ember from 'ember';`

TopLevelComponent = Ember.Component.extend
  layout: Ember.Handlebars.compile('{{yield}}')

  onDidInsertElement: (->
    @$().appendTo(document.body)
  ).on('didInsertElement')

  onWillDestroyElement: (->
    Ember.$(document.body).find("##{@get('elementId')}").remove()
  ).on('willDestroyElement')

`export default TopLevelComponent;`
