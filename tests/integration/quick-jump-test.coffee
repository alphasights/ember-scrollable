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
            "initials": "JB",
            "id": 1
          }
        })
      ]

    @get '/swordfish/quick_jumps', (request) ->
      [
        200,
        { "Content-Type": "application/json" },

        JSON.stringify({
          "hits": {
            "hits": [{
              "_index": "client-contacts",
              "_type": "contact",
              "_source": {
                "name": "Reda Rebib"
              }
            }, {
              "_index": "advisors",
              "_type": "advisor",
              "_source": {
                "name": "H. Reddy"
              }
            }]
          }
        })
      ]

  visit '/'
  click '.quick-jump .bar input'
  fillIn '.quick-jump .bar input', 'red'

  andThen ->
    equal find('.quick-jump .results section:first-of-type li').length, 1, "Results contain only one top hit"
