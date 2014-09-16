`import Ember from 'ember';`

QuickJumpComponent = Ember.Component.extend
  isActive: false
  placeholder: null
  classNameBindings: [':quick-jump', 'isActive:active']

  didInsertElement: ->
    @$('input').on 'focusin', =>
      @set('isActive', true)
      true

    Ember.$(document).on 'click', (event) =>
      $target = $(event.target)

      unless $target.closest('.quick-jump, .quick-jump-results .content').length > 0
        @set('isActive', false)

      true

`export default QuickJumpComponent;`
