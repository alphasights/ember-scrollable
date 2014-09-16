`import Ember from "ember";`

TopLevelComponent = Ember.Component.extend
  layout: Ember.Handlebars.compile('{{yield}}')

  didInsertElement: ->
    @$().appendTo(document.body)

`export default TopLevelComponent`
