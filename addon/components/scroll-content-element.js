import Ember from 'ember';
import layout from '../templates/components/scroll-content-element';
import {styleify} from '../util/css';

const {
  computed,
  run: {bind, scheduleOnce},
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

  scrollOffsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'scrollLeft' : 'scrollTop';
  }),

  style: computed('stylesJSON.{height,width}', function() {
    return styleify(this.get('stylesJSON'));
  }),


  scrollTo: 0,

  /**
   * Previous scrollTo value. Useful for calculating changes in scrollTo.
   *
   * @property _previousScrollTo
   * @private
   * @type Number
   */
  _previousScrollTo: 0,

  scrolled(e) {
    this.get('onScroll')(e, e.target[this.get('scrollOffsetAttr')]);
  },

  scrollToPosition(offset) {
    offset = Number.parseInt(offset, 10);

    if (Number.isNaN(offset)) {
      return;
    }
    this.$()[this.get('scrollOffsetAttr')](offset);
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().on('scroll', bind(this, this.scrolled));
  },

  didReceiveAttrs() {
    const oldOffset = this.get('_previousScrollTo');
    const newOffset = this.get('scrollTo');

    if (oldOffset !== newOffset) {
      this.set('_previousScrollTo', newOffset);
      scheduleOnce('afterRender', this, this.scrollToPosition, this.get('scrollTo'));
    }
  }

});

