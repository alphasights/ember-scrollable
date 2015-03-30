import Ember from 'ember';

export default Ember.Mixin.create({
  viewName: 'sidePanel',

  renderTemplate: function() {
    this.render(this.routeName, {
      into: 'application',
      outlet: 'side-panel'
    });

    if (this.sidePanelActionsTemplateName != null) {
      this.render(this.sidePanelActionsTemplateName, {
        into: this.routeName,
        outlet: 'actions'
      });
    }
  }
});
