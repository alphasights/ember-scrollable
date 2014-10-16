import Ember from 'ember';

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  isLoading: function() {
    return this.get('promise') && this.get('isPending');
  }.property('promise', 'isPending')
});
