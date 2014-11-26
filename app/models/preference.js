import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  sideBarCollapsed: DS.attr('boolean')
});
