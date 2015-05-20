import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this._super.apply(this, arguments);

    this.render(this.routeName, {
      into: 'application',
      outlet: 'side-panel'
    });
  }
});
