import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import Component from '@ember/component';
import layout from '../templates/components/scroll-content-element';
import DomMixin from 'ember-lifeline/mixins/dom';
import { styleify } from '../util/css';
import Number from '../util/number';

/**
 *
 * Handles scroll events within the body of the scroll content,
 * properly sets scrollTop / scrollLeft property depending on the configuration and the given scrollTo.
 *
 * @class ScrollContentElement
 * @extends Ember.Component
 */
export default Component.extend(DomMixin, {
  /**
   * Adds the `tse-scroll-content` class to this element which is in charge of removing the default scrollbar(s) from
   * this element (the container for the content being scrolled). Also the `tse-scroll-content` class enables
   * overflow to trigger scroll events although this element doesn't have a native scrollbar.
   *
   * @property  classNameBindings
   * @public
   * @type Array
   */
  classNameBindings: [':tse-scroll-content'],
  attributeBindings: ['style'],
  layout,
  /**
   * Callback function when scroll event occurs.
   * Arguments are: jQueryEvent, scrollOffset, and horizontal'|'vertical'
   * @property onScroll
   * @public
   * @type Function
   */
  onScroll(){},

  /**
   * Height of this content. Note content must have a height that is larger than this in order to cause overflow-y,
   * and enabling scrolling.
   *
   * @property height
   * @public
   * @type Number
   */
  height: null,

  /**
   * Width of this content. Note contnet must have a width that is larger than this in order to cause overflow-x
   * therefore enabling scrolling.
   *
   * @property width
   * @public
   * @type Number
   */
  width: null,

  /**
   * Integer representing desired scrollLeft to be set for this element.
   *
   * @property scrollToX
   * @public
   * @type Number
   * @default 0
   */
  scrollToX: 0,

  /**
   * Integer representing desired scrollTop to be set for this element.
   *
   * @property scrollToX
   * @public
   * @type Number
   * @default 0
   */
  scrollToY: 0,

  /**
   * Intermediate object to collect style attributes. Height and width are set dynamically such that space is allocated
   * for the given scrollbars that will be rendered.
   *
   * @property stylesJSON
   * @private
   */
  stylesJSON: computed('height', 'width', function() {
    const { height, width } = this.getProperties('height', 'width');
    return { width: width + 'px', height: height + 'px' };
  }),

  /**
   * String bound to the style attribute.
   *
   * @property style
   * @private
   * @type String
   */
  style: computed('stylesJSON.{height,width}', function() {
    return styleify(this.get('stylesJSON'));
  }),

  /**
   * Previous scrollToX value. Useful for calculating changes in scrollToX.
   *
   * @property previousScrollToX
   * @private
   * @type Number
   */
  previousScrollToX: 0,

  /**
   * Previous scrollToY value. Useful for calculating changes in scrollToY.
   *
   * @property previousScrollToY
   * @private
   * @type Number
   */
  previousScrollToY: 0,

  /**
   * Callback from scroll event on the content of this element.
   * Determines direction of scroll and calls the `onScroll` action with:
   *  - the jQueryEvent
   *  - the scrollOffset -- indicates positioning from top/left anchor point
   *  - 'horizontal' | 'vertical' -- indicates direction of scroll
   *
   * @method scrolled
   * @param e jQueryEvent
   */
  scrolled(e) {
    const newScrollLeft = e.target.scrollLeft;
    const newScrollTop = e.target.scrollTop;

    if (newScrollLeft !== this.get('previousScrollToX')) {
      this.get('onScroll')(e, newScrollLeft, 'horizontal');
      this.set(`previousScrollToX`, newScrollLeft);
    } else if (newScrollTop !== this.get('previousScrollToY')) {
      this.get('onScroll')(e, newScrollTop, 'vertical');
      this.set(`previousScrollToY`, newScrollTop);
    }
  },

  /**
   * Sets the scroll property (scrollTop, or scrollLeft) for the given the direction and offset.
   *
   * @method scrollToPosition
   * @private
   * @param offset  Number -- offset amount in pixels
   * @param direction String -- 'X' | 'Y' -- indicates what direction is being scrolled
   */
  scrollToPosition(offset, direction) {
    offset = Number.parseInt(offset, 10);

    if (Number.isNaN(offset)) {
      return;
    }
    let scrollOffsetAttr = direction === 'X' ? 'scrollLeft' : 'scrollTop';
    this.get('element')[scrollOffsetAttr] = offset
  },

  configureInitialScrollPosition() {
    this.scrollToPosition(this.get('scrollToX'), 'X');
    this.scrollToPosition(this.get('scrollToY'), 'Y');
  },

  didInsertElement() {
    this._super(...arguments);
    this.addEventListener(this.element, 'scroll', this.scrolled);
    this.configureInitialScrollPosition();
  },

  didReceiveAttrs() {
    // Sync property changes to `scrollToX` and `scrollToY` with the `scrollTop` and `scrollLeft` attributes
    // of the rendered DOM element.
    ['X', 'Y'].forEach((direction) => {
      const oldOffset = this.get(`previousScrollTo${direction}`);
      const newOffset = this.get(`scrollTo${direction}`);

      if (oldOffset !== newOffset) {
        schedule('afterRender', this, this.scrollToPosition, newOffset, direction);
      }
    });
  }

});
