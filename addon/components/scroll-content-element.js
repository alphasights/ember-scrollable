import Ember from 'ember';
import layout from '../templates/components/scroll-content-element';
import {styleify} from '../util/css';

const {
  computed,
  run: {bind},
  K
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':tse-scroll-content'],
  attributeBindings: ['style'],
  layout,
  onScroll: K,
  height: null,
  width: null,
  stylesJSON: computed('height', 'scrollContentWidth', function() {
    const {height, width} = this.getProperties('height', 'width');
    return {width: width + 'px', height: height + 'px'};
  }),

  style: computed('stylesJSON.{height,width}', function() {
    return styleify(this.get('stylesJSON'));
  }),

  scrolled(e) {
    this.get('onScroll')(e);
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().on('scroll', bind(this, this.scrolled));
  }

});

