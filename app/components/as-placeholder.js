import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':placeholder'],
  attributeBindings: ['icon', 'title', 'link'],
  tagName: 'section'
});
