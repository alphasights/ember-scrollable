`import Ember from 'ember';`
`import PromiseController from './promise'`

QuickJumpController = Ember.Controller.extend
  query: null
  results: null
  requestPromise: null

  queryDidChange: (->
    Ember.run.debounce(this, 'search', 250)
  ).observes('query')

  search: ->
    query = @get('query')

    if query.length > 2
      @set('requestPromise', PromiseController.create(
        promise:
          $.getJSON('/swordfish/quick_jumps.json', q: query).then (response) =>
            @set('results', response.hits.hits)
      ))
    else
      @set('results', null)

`export default QuickJumpController;`
