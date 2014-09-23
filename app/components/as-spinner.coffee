`import Ember from 'ember';`

AsSpinnerComponent = Ember.Component.extend
  classNames: ['spinner']

  didInsertElement: ->
    new Spinner(
      width: 2
      length: 3
      radius: 4
      color: '#ffffff'
    ).spin(@$()[0])

`export default AsSpinnerComponent;`
