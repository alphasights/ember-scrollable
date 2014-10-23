import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: ['type'],
  availableTypes: ['project'],

  type: function() {
    var type = this.get('controller.type');

    if (type != null && this.get('availableTypes').contains(type)) {
      return type;
    } else {
      return 'default';
    }
  }.property('controller.type'),

  templateName: function() {
    return `quick-jump/${this.get('type')}`;
  }.property('type')
});
