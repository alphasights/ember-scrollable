`import Ember from 'ember';`
`import { test } from 'ember-qunit';`
`import startApp from '../helpers/start-app';`

module "Quick Jump",
  setup: ->
    @app = startApp()

  teardown: ->
    Ember.run @app, @app.destroy

test "Search results", ->
  new Pretender ->
    @get '/swordfish/users/me', (request) ->
      [
        200,
        { "Content-Type": "application/json" },

        JSON.stringify({
          "user": {
            "initials": "EU",
            "id": 1
          }
        })
      ]

    @get '/swordfish/quick_jumps', (request) ->
      if request.queryParams.q == 'example'
        [
          200,
          { "Content-Type": "application/json" },

          JSON.stringify({
            "hits": {
              "hits": [{
                "_index": "client-contacts",
                "_type": "contact",
                "_source": {
                  "name": "Example Client Contact"
                }
              }, {
                "_index": "client-entities",
                "_type": "entity",
                "_source": {
                  "name": "Example Client Entity"
                }
              }, {
                "_index": "client-accounts",
                "_type": "account",
                "_source": {
                  "name": "Example Client Account"
                }
              }, {
                "_index": "advisors",
                "_type": "advisor",
                "_source": {
                  "name": "Example Advisor"
                }
              }, {
                "_index": "projects",
                "_type": "project",
                "_source": {
                  "codename": "Example Project"
                }
              }, {
                "_index": "users",
                "_type": "user",
                "_source": {
                  "name": "Example User"
                }
              }]
            }
          })
        ]

  visit '/'
  click '.quick-jump .bar input'
  fillIn '.quick-jump .bar input', 'example'

  andThen ->
    sections = find('.quick-jump .results section').toArray().map (section) ->
      $section = $(section)

      title: $section.find('h1').text()
      results: $section.find('li').toArray().map (item) -> _.str.trim($(item).text())

    deepEqual sections, [{
      title: 'Top Hit'
      results: ['Example Client Contact']
    }, {
      title: 'Projects'
      results: ['Example Project']
    }, {
      title: 'Advisors'
      results: ['Example Advisor']
    }, {
      title: 'Users'
      results: ['Example User']
    }, {
      title: 'Contacts'
      results: ['Example Client Contact']
    }, {
      title: 'Entities'
      results: ['Example Client Entity']
    }, {
      title: 'Accounts'
      results: ['Example Client Account']
    }]
