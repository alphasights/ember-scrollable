`import Ember from 'ember';`

PromiseController = Ember.Controller.extend Ember.PromiseProxyMixin,
  isLoading: (->
    @get('promise') && @get('isPending')
  ).property('promise', 'isPending')

`export default PromiseController;`
