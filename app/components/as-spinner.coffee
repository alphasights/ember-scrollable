`import Ember from 'ember';`

AsSpinnerComponent = Ember.Component.extend
  classNames: ['spinner']

  didInsertElement: ->
    new Spinner().spin(@$()[0]);

`export default AsSpinnerComponent;`
