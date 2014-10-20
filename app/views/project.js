import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['dataId:data-id'],
  classNameBindings: ['isOpen:open', 'projectRow', 'isSortable:sortable'],
  templateName: 'views/project',
  projectRow: 'project-row',
  dataId: Ember.computed.alias('controller.id'),
  isSortable: Ember.computed.alias('controller.isSortable'),
  isOpen: Ember.computed.alias('controller.isOpen')
});
