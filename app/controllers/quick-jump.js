import Ember from 'ember';
import PromiseController from './promise';
import { request } from 'ic-ajax';

export default Ember.Controller.extend({
  query: null,
  results: null,
  requestPromise: null,

  resultSectionsOrder: [
    'user', 'contact', 'advisor', 'project', 'entity', 'account', 'target'
  ],

  resultSectionTitlesMapping: {
    'user': 'Colleagues',
    'contact': 'Contacts',
    'advisor': 'Advisors',
    'project': 'Projects',
    'entity': 'Entities',
    'account': 'Accounts',
    'target': 'Targets'
  },

  allSections: Ember.computed('sortedResultSections', 'topHitSection', 'results', function() {
    if (Ember.isPresent(this.get('results'))) {
      return [this.get('topHitSection')].concat(this.get('sortedResultSections'));
    } else {
      return [];
    }
  }),

  normalizedResults: Ember.computed('results', function() {
    var results = this.get('results');

    if (results != null) {
      return results.map(function(result) {
        var source = _(result._source).reduce(function(memo, value, key) {
          memo[key.camelize()] = value;
          return memo;
        }, {});

        return _({}).extend(source, {
          type: result._type,
          score: result._score,
          id: result._id
        });
      });
    } else {
      return [];
    }
  }),

  topHit: Ember.computed('normalizedResults', function() {
    return _(this.get('normalizedResults')).max(function(result) {
      return result.score;
    });
  }),

  topHitSection: Ember.computed('topHit', function() {
    var topHit = this.get('topHit');

    return {
      title: `Top Hit - ${topHit.type.capitalize()}`,
      results: [topHit]
    };
  }),

  sortedResultSections: Ember.computed('resultSections', function() {
    var resultSectionsOrder = this.get('resultSectionsOrder');

    return this.get('resultSections').sort(function(a, b) {
      return resultSectionsOrder.indexOf(a.type) -
             resultSectionsOrder.indexOf(b.type);
    });
  }),

  resultSections: Ember.computed('normalizedResults', function() {
    var resultSectionTitlesMapping = this.get('resultSectionTitlesMapping');

    return _(this.get('normalizedResults'))
      .chain()
      .groupBy('type')
      .map(function(results, type) {
        return {
          title: resultSectionTitlesMapping[type],
          results: results,
          type: type
        };
      }).value();
  }),

  queryDidChange: Ember.observer('query', function() {
    Ember.run.debounce(this, '_queryDidChange', 100);
  }),

  _queryDidChange: function() {
    var query = this.get('query');

    if (query && query.length > 2) {
      var requestPromise = PromiseController.create({
        promise: request(`${EmberENV.apiBaseUrl}/quick_jumps`, {
          data: { q: query }
        }).then(response => {
          if (requestPromise !== this.get('requestPromise')) { return; }

          this.set('results', _.chain(response.responses)
            .map(function(response) {
              if (Ember.isBlank(response.hits)) {
                return [];
              } else {
                return response.hits.hits;
              }
            })
            .flatten()
            .value()
          );
        })
      });

      this.set('requestPromise', requestPromise);
    } else {
      this.setProperties({ requestPromise: null, results: null });
    }
  },

  actions: {
    clear: function() {
      this.set('query', null);
    }
  }
});
