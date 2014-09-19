`import Ember from 'ember';`
`import { Promise } from 'vendor/liquid-fire';`

Velocity = Ember.$.Velocity

hide = (oldView, insertNewView) ->
  Velocity.animate(oldView.$(), { opacity: [0, 1] }, { duration: 150 }).then ->
    insertNewView()

reveal = (insertNewView) ->
  insertNewView().then (newView) ->
    newView.$().css
      display: ''
      visibility: ''
      opacity: 0

    Velocity.animate(newView.$(), { opacity: [1, 0] }, { duration: 150 })

quickJump = (oldView, insertNewView) ->
  if oldView.$('.results').length > 0
    hide(oldView, insertNewView)
  else
    reveal(insertNewView)

`export default quickJump;`