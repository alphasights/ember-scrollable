import Ember from 'ember';
import PromiseController from 'phoenix/controllers/promise';
import config from '../config/environment';
import { request } from 'ic-ajax';

export default Ember.Controller.extend({
  query: null,
  results: null,
  requestPromise: null,

  resultSectionsOrder: [
    'project', 'advisor', 'user', 'contact', 'entity', 'account'
  ],

  normalizedResults: function() {
    var results = this.get('results');

    if (!Ember.isBlank(results)) {
      return results.map(function(result) {
        return _({}).extend(result._source, { type: result._type, score: result._score });
      });
    } else {
      return [];
    }
  }.property('results'),

  topHit: function() {
    return _(this.get('normalizedResults')).max(function(result) { return result.score; });
  }.property('normalizedResults'),

  topHitSection: function() {
    return { title: 'Top Hit', results: [this.get('topHit')] };
  }.property('topHit'),

  allSections: function() {
    return [this.get('topHitSection')].concat(this.get('sortedResultSections'));
  }.property('sortedResultSections', 'topHitSection'),

  sortedResultSections: function() {
    var resultSectionsOrder = this.get('resultSectionsOrder');

    return this.get('resultSections').sort(function(a, b) {
      return resultSectionsOrder.indexOf(a.type) - resultSectionsOrder.indexOf(b.type);
    });
  }.property('resultSections'),

  resultSections: function() {
    return _(this.get('normalizedResults')).chain().groupBy('type').map(function(results, type) {
      return { title: type.capitalize().pluralize(), results: results, type: type };
    }).value();
  }.property('normalizedResults'),

  queryDidChange: function() {
    return Ember.run.debounce(this, 'search', 500);
  }.observes('query'),

  search: function() {
    var query = this.get('query');

    if (query && query.length > 2) {
      this.set('requestPromise', PromiseController.create({
        promise: request(config.APP.apiBaseUrl + '/quick_jumps', { data: { q: query } })
          .then(response => {
            this.set('results', _.chain(response.responses)
              .map(function(response) { return response.hits.hits; })
              .flatten()
              .value());
          })
        })
      );
    } else {
      this.set('results', null);
    }
  },

  actions: {
    clear: function() {
      this.set('query', null);
    }
  }
});
