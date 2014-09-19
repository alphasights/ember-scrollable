`import Ember from 'ember';`

ApplicationView = Ember.View.extend
  classNames: ['application']
  showOverlay: false
  
  onDidInsertElement: (->
    Ember.$(document).foundation()
  ).on('didInsertElement')

`export default ApplicationView;`
