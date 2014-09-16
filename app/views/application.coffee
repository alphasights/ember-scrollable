`import Ember from 'ember';`

ApplicationView = Ember.View.extend
  onDidInsertElement: (->
    Ember.$(document).foundation()

    @$('.search input').on 'focusin', =>
      @get('controller').set('isSearching', true)
      true

    Ember.$(document).on 'click', (event) =>
      $target = $(event.target)

      unless $target.closest('.search, .search-results .content').length > 0
        @get('controller').set('isSearching', false)

      true
  ).on('didInsertElement')

`export default ApplicationView;`
