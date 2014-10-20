import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,
  targetValueString: Ember.computed.oneWay('targetValue'),
  previousTargetValue: null,

  targetValueStringDidChange: (function() {
    var string = this.get('targetValueString');
    var targetValue = string ? parseInt(string, 10) : 0;
    this.set('targetValue', targetValue);
  }).observes('targetValueString'),

  inputId: (function() {
    return `target-value-${this.get('id')}`;
  }).property('id'),

  actions: {
    edit: function() {
      this.set('previousTargetValue', this.get('targetValue'));
      this.set('isEditing', true);
    },

    updateTarget: function() {
      this.set('isEditing', false);

      if (this.get('previousTargetValue') !== this.get('targetValue')) {
        this.saveWithErrors(this.get('model'));
      }
    },

    deleteMembership: function() {
      this.get('angle.teamMembers').popObject(this.get('teamMember'));
      this.get('model').destroyRecord();
    }
  }
});
