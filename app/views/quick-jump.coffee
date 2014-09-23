`import Ember from 'ember';`

QuickJumpView = Ember.View.extend
  classNameBindings: [':quick-jump', 'isActive:active', 'isLoading:loading']
  isActive: false
  templateName: 'views/quick-jump'
  placeholder: null
  isLoading: Ember.computed.alias('controller.requestPromise.isLoading')

  didInsertElement: ->
    @$('input').on 'focusin', =>
      @set('isActive', true)
      true

    Ember.$(document).on 'click', (event) =>
      $target = $(event.target)
      $nonBlurringElements = $('.quick-jump .bar, .quick-jump .results')

      unless $target.closest($nonBlurringElements).length > 0
        @set('isActive', false)

      true

`export default QuickJumpView;`
