`import Ember from 'ember';`
`import ApplicationView from './application';`

QuickJumpView = Ember.View.extend
  classNameBindings: [':quick-jump', 'isActive:active']
  isActive: false
  templateName: 'views/quick-jump'
  placeholder: null

  didInsertElement: ->
    @$('input').on 'focusin', =>
      @set('isActive', true)
      true

    Ember.$(document).on 'click', (event) =>
      $target = $(event.target)
      $nonBlurringElements = $('.quick-jump')

      unless $target.closest($nonBlurringElements).length > 0
        @set('isActive', false)

      true

`export default QuickJumpView;`
