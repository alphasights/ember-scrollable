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
              "name": "Example Client Contact"
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
              "name": "Example Advisor"
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
              "codename": "Example Project"
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
              "name": "Example User"
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
        results: $section.find('li').toArray().map(function(item) { return _.str.trim($(item).text()); })
      };
    });

    deepEqual(sections, [
      {
        title: 'Top Hit',
        results: ['Example User']
      }, {
        title: 'Projects',
        results: ['Example Project']
      }, {
        title: 'Advisors',
        results: ['Example Advisor']
      }, {
        title: 'Users',
        results: ['Example User']
      }, {
        title: 'Contacts',
        results: ['Example Client Contact']
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
