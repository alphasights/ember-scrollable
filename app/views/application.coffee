`import Ember from 'ember';`

ApplicationView = Ember.View.extend
  classNames: ['application']

  onDidInsertElement: (->
    Ember.$(document).foundation()
  ).on('didInsertElement')

`export default ApplicationView;`
