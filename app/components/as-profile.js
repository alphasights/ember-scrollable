import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':profile'],
  tagName: 'article',
  
  person: null,
  title: null
});
