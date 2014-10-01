`import Ember from 'ember';`
`import { test } from 'ember-qunit';`
`import startApp from '../helpers/start-app';`

module "Quick Jump",
  setup: ->
    @app = startApp()

  teardown: ->
    Ember.run @app, @app.destroy

test "Search results", ->
  visit '/'
  click '.quick-jump .bar input'
  fillIn '.quick-jump .bar input', 'red'

  andThen ->
    equal find('.quick-jump .results section:first-of-type li').length, 1, "Results contain only one top hit"
