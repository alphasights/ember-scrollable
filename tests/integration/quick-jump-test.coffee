`import Ember from 'ember';`
`import { test } from 'ember-qunit';`
`import startApp from '../helpers/start-app';`

module "Quick Jump",
  setup: ->
    @app = startApp()

  teardown: ->
    Ember.run @app, @app.destroy

test "Page contents", ->
  visit('/').then ->
    equal find('.quick-jump').length, 1, "Page contains quick jump component"
