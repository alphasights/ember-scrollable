import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import config from '../../config/environment';
import testConfig from '../test-helper';

module("Quick Jump", testConfig);

test("Search results", function() {
  defineFixture('/quick_jumps', { q: 'example' }, {
    "responses": [
      {
        "hits": {
          "hits": [{
            "_index": "client-contacts",
            "_type": "contact",
            "_score": 5,
            "_source": {
              "name": "Example Client Contact",
              "account_name": "Example Account Name"
            }
          }]
        }
      },
      {
        "hits": {
          "hits": [{
            "_index": "client-entities",
            "_type": "entity",
            "_score": 1,
            "_source": {
              "name": "Example Client Entity"
            }
          }]
        }
      },
      {
        "hits": {
          "hits": [{
            "_index": "client-accounts",
            "_type": "account",
            "_score": 10,
            "_source": {
              "name": "Example Client Account"
            }
          }]
        }
      },
      {
        "hits": {
          "hits": [{
            "_index": "advisors",
            "_type": "advisor",
            "_score": 4,
            "_source": {
              "name": "Example Advisor",
              "best_position": "Example Best Position"
            }
          }]
        }
      },
      {
        "hits": {
          "hits": [{
            "_index": "projects",
            "_type": "project",
            "_score": 2,
            "_source": {
              "codename": "Example Project",
              "external_title": "Example External Title"
            }
          }]
        }
      },
      {
        "hits": {
          "hits": [{
            "_index": "users",
            "_type": "user",
            "_score": 11,
            "_source": {
              "name": "Example User",
              "team_name": "Example Team Name"
            }
          }]
        }
      }
    ]
  });

  visit('/');
  click('.quick-jump .bar input');
  fillIn('.quick-jump .bar input', 'example');

  andThen(function() {
    var sections = find('.quick-jump .results section').toArray().map(function(section) {
      var $section = $(section);

      return {
        title: $section.find('h1').text(),
        results: $section.find('li span').toArray().map(function(item) { return _.str.trim($(item).text()); })
      };
    });

    deepEqual(sections, [
      {
        title: 'Top Hit',
        results: ['Example User', 'Example Team Name']
      }, {
        title: 'Colleagues',
        results: ['Example User', 'Example Team Name']
      }, {
        title: 'Contacts',
        results: ['Example Client Contact', 'Example Account Name']
      }, {
        title: 'Advisors',
        results: ['Example Advisor', 'Example Best Position']
      }, {
        title: 'Projects',
        results: ['Example Project', 'Example External Title']
      }, {
        title: 'Entities',
        results: ['Example Client Entity']
      }, {
        title: 'Accounts',
        results: ['Example Client Account']
      }]
    );
  });
});
