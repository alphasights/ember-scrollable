import Ember from 'ember';
import layout from '../templates/components/scroll-content-element';
import {styleify} from '../util/css';

const {
  computed,
  run: {bind, scheduleOnce},
  K
} = Ember;

/**
 *
 * Handles scroll events within the body of the scroll content,
 * properly sets scrollTop / scrollLeft property depending on the configuration and the given scrollTo.
 *
 * @class ScrollContentElement
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  classNameBindings: [':tse-scroll-content'],
  attributeBindings: ['style'],
  layout,
  onScroll: K,
  height: null,
  width: null,
  stylesJSON: computed('height', 'width', function() {
    const {height, width} = this.getProperties('height', 'width');
    return {width: width + 'px', height: height + 'px'};
  }),

  scrollOffsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'scrollLeft' : 'scrollTop';
  }),

  style: computed('stylesJSON.{height,width}', function() {
    return styleify(this.get('stylesJSON'));
  }),

  // TODO separate into two properties for x and y scrolling when supporting two way
  scrollToX: 0,
  scrollToY: 0,

  /**
   * Previous scrollTo value. Useful for calculating changes in scrollTo.
   *
   * @property previousScrollTo
   * @private
   * @type Number
   */
  previousScrollToX: 0,

  previousScrollToY: 0,

  scrolled(e) {
    const newScrollLeft = e.target.scrollLeft;
    const newScrollTop = e.target.scrollTop;

    const horizontal = newScrollLeft !== this.get('previousScrollToX');
    if (horizontal) {
      this.get('onScroll')(e, newScrollLeft, 'horizontal');
    } else {
      this.get('onScroll')(e, newScrollTop, 'vertical');
    }
  },

  scrollToPosition(offset, direction) {
    offset = Number.parseInt(offset, 10);

    if (Number.isNaN(offset)) {
      return;
    }
    const scrollOffsetAttr = direction === 'X' ? 'scrollLeft' : 'scrollTop';
    this.$()[scrollOffsetAttr](offset);
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().on('scroll', bind(this, this.scrolled));
  },

  didReceiveAttrs() {
    ['X', 'Y'].forEach((direction) => {
      const oldOffset = this.get(`previousScrollTo${direction}`);
      const newOffset = this.get(`scrollTo${direction}`);

      if (oldOffset !== newOffset) {
        this.set(`previousScrollTo${direction}`, newOffset);
        scheduleOnce('afterRender', this, this.scrollToPosition, newOffset, direction);
      }
    });
  }

});

