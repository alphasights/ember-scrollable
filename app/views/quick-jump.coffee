`import Ember from 'ember';`

QuickJumpView = Ember.View.extend
  classNameBindings: [':quick-jump', 'isActive:active', 'isLoading:loading']
  isActive: false
  templateName: 'views/quick-jump'
  placeholder: null
  isLoading: Ember.computed.alias('controller.requestPromise.isLoading')

  clickEventName: (->
    "click.#{@get('elementId')}"
  ).property('elementId')

  didInsertElement: ->
    Ember.$(document).on @get('clickEventName'), (event) =>
      $target = $(event.target)
      $nonBlurringElements = $('.quick-jump .bar, .quick-jump .results')

      unless $target.closest($nonBlurringElements).length > 0
        @set('isActive', false)

      true

  willDestroyElement: ->
    Ember.$(document).off(@get('clickEventName'))

  actions:
    onBarFocusIn: ->
      @set('isActive', true)

`export default QuickJumpView;`
