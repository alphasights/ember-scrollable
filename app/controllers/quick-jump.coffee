`import Ember from 'ember';`

QuickJumpController = Ember.Controller.extend
  query: null

  queryDidChange: (->
    console.log @get('query')
  ).observes('query')

`export default QuickJumpController;`
