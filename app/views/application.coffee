`import Ember from 'ember';`

ApplicationView = Ember.View.extend
  onDidInsertElement: (->
    Ember.$(document).foundation()
  ).on('didInsertElement')

`export default ApplicationView;`
