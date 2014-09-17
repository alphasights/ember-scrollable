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

      unless $target.closest('.quick-jump, .quick-jump-results .content').length > 0
        @set('isActive', false)

      true

`export default QuickJumpView;`
