`import Ember from 'ember';`
`import PromiseController from 'phoenix/controllers/promise';`
`import config from 'phoenix/config/environment';`
`import { request } from 'ic-ajax';`

QuickJumpController = Ember.Controller.extend
  query: null
  results: null
  requestPromise: null
  resultSectionsOrder: ['project', 'advisor', 'user', 'contact', 'entity', 'account']

  normalizedResults: (->
    results = @get('results')

    if results?
      results.map (result) ->
        _({}).extend(result._source, type: result._type)
    else
      []
  ).property('results')

  topHitSection: (->
    title: 'Top Hit', results: [@get('normalizedResults.firstObject')]
  ).property('normalizedResults')

  allSections: (->
    [@get('topHitSection')].concat(@get('sortedResultSections'))
  ).property('sortedResultSections', 'topHitSection')

  sortedResultSections: (->
    resultSectionsOrder = @get('resultSectionsOrder')

    @get('resultSections').sort (a, b) ->
      resultSectionsOrder.indexOf(a.type) - resultSectionsOrder.indexOf(b.type)
  ).property('resultSections')

  resultSections: (->
    _(@get('normalizedResults')).chain().groupBy('type').map((results, type) ->
      title: type.capitalize().pluralize(), results: results, type: type
    ).value()
  ).property('normalizedResults')

  queryDidChange: (->
    Ember.run.debounce(this, 'search', 250)
  ).observes('query')

  search: ->
    query = @get('query')

    if query && query.length > 2
      @set('requestPromise', PromiseController.create(
        promise:
          request("#{config.APP.apiBaseURL}/quick_jumps", data: { q: query })
            .then (response) =>
              @set('results', response.hits.hits)
      ))
    else
      @set('results', null)

  actions:
    clear: ->
      @set('query', null)

`export default QuickJumpController;`
