`import Ember from 'ember';`
`import { Promise } from 'vendor/liquid-fire';`

Velocity = Ember.$.Velocity

hide = (oldView, insertNewView) ->
  $results = oldView.$('.results')

  Velocity.animate($results, { opacity: [0, 1] }, { duration: 150 }).then ->
    insertNewView()

reveal = (insertNewView) ->
  insertNewView().then (newView) ->
    newView.$().css
      display: '',
      visibility: ''

    $results = newView.$('.results')

    Velocity.animate($results, { opacity: [1, 0] }, { duration: 150 })

quickJump = (oldView, insertNewView) ->
  if oldView.$('.results').length > 0
    hide(oldView, insertNewView)
  else
    reveal(insertNewView)

`export default quickJump;`
