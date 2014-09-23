`import Ember from 'ember';`

AsProgressIndicatorComponent = Ember.Component.extend
  classNames: ['progress-indicator']
  layoutName: 'components/progress-indicator'

  _promise: null

  promise: ((key, value) ->
    if arguments.length > 1
      if value?
        controller = Ember.Object.extend(Ember.PromiseProxyMixin)
        promise = controller.create(promise: value)
      else
        promise = null

      @set('_promise', promise)

    @get('_promise')
  ).property()

`export default AsProgressIndicatorComponent;`
