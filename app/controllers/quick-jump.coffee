`import Ember from 'ember';`
`import PromiseController from 'phoenix/controllers/promise'`

QuickJumpController = Ember.Controller.extend
  query: null
  results: null
  requestPromise: null

  normalizedResults: (->
    results = @get('results')

    if results?
      results.map (result) ->
        _(result._source).extend(type: result._type)
    else
      []
  ).property('results')

  topHitSection: (->
    title: 'Top Hit', results: [@get('normalizedResults.firstObject')]
  ).property('normalizedResults')

  resultsSections: (->
    [@get('topHitSection')].concat _(@get('normalizedResults')).chain().groupBy('type').map((results, type) ->
      title: type.capitalize().pluralize(), results: results
    ).value()
  ).property('normalizedResults', 'topHitSection')

  queryDidChange: (->
    Ember.run.debounce(this, 'search', 250)
  ).observes('query')

  search: ->
    query = @get('query')

    if query && query.length > 2
      @set('requestPromise', PromiseController.create(
        promise:
          $.getJSON('/swordfish/quick_jumps.json', q: query).then (response) =>
            @set('results', response.hits.hits)
      ))
    else
      @set('results', null)

  actions:
    clear: ->
      @set('query', null)

`export default QuickJumpController;`
