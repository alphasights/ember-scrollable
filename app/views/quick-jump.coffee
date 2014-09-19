`import Ember from 'ember';`
`import ApplicationView from './application';`

QuickJumpView = Ember.View.extend
  classNameBindings: [':quick-jump', 'isActive:active']
  isActive: false
  templateName: 'views/quick-jump'
  placeholder: null
  applicationView: null

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

    @set('applicationView', @nearestOfType(ApplicationView))

  queryDidChange: (->
    @get('controller').send('')
  ).observes('query')

  isActiveDidChange: (->
    @set('applicationView.showOverlay', @get('isActive'))
  ).observes('isActive')

`export default QuickJumpView;`
