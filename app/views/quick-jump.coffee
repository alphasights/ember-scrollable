`import Ember from 'ember';`

QuickJumpView = Ember.View.extend
  classNameBindings: [':quick-jump', 'isActive:active']
  isActive: false
  layoutName: 'views/quick-jump'
  placeholder: null

  didInsertElement: ->
    @$('input').on 'focusin', =>
      @set('isActive', true)
      true

    Ember.$(document).on 'click', (event) =>
      $target = $(event.target)
      $nonBlurringElements = $('.quick-jump, .quick-jump-results .content')

      unless $target.closest($nonBlurringElements).length > 0
        @set('isActive', false)

      true

  queryDidChange: (->
    @get('controller').send('')
  ).observes('query')

`export default QuickJumpView;`
