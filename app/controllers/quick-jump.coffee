`import Ember from 'ember';`

QuickJumpController = Ember.Controller.extend
  query: null

  queryDidChange: (->
    alert @get('query')
  ).observes('query')

`export default QuickJumpController;`
