import Ember from 'ember';

export default Ember.CollectionView.extend({
  contentBinding: 'controller.stats',
  tagName: 'ul',
  classNames: ['stats-list'],
  
  itemViewClass: Ember.View.extend({
    tagName: 'li',
    templateName: 'views/stat'
  })
});
