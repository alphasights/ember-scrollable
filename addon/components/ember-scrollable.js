import Ember from 'ember';
import InboundActionsMixin from 'ember-component-inbound-actions/inbound-actions';
import layout from '../templates/components/ember-scrollable';
import {Horizontal, Vertical} from '../classes/scrollable';

const {
  computed,
  run: {
    scheduleOnce,
    debounce
  },
  $
} = Ember;

const hideDelay = Ember.testing ? 16 : 1000;
const PAGE_JUMP_MULTIPLE = 7 / 8;

const scrollbarSelector = '.tse-scrollbar';
const scrollContentSelector = '.tse-scroll-content';
const contentSelector = '.tse-content';

export default Ember.Component.extend(InboundActionsMixin, {
  layout,
  classNameBindings: [':ember-scrollable', ':tse-scrollable', 'horizontal:horizontal:vertical', 'double:horizontal'],

  /**
   * If horizontal is true, the scrollbar will be shown horizontally, else vertically.
   *
   * @property horizontal
   * @public
   * @type Boolean
   * @default false
   */
  horizontal: false,

  /**
   * Use double scrollbar, ignores horizontal attribute if this is set.
   *
   * @property double
   * @public
   * @type Boolean
   */
  double: false,
  /**
   * Indicates whether the scrollbar should auto hide after a given period of time (see hideDelay),
   * or remain persitent alongside the content to be scrolled.
   *
   * @property autoHide
   * @public
   * @type Boolean
   * @default true
   */
  autoHide: true,
  scrollBuffer: 50,
  /**
   * Number indicating offset from anchor point (top for vertical, left for horizontal) where the scroll handle
   * should be rendered.
   *
   * @property scrollTo
   * @public
   * @type Number
   */
  scrollTo: 0,

  scrollToX: 0,
  scrollToY: 0,

  horizontalScrollbar: null,
  verticalScrollbar: null,

  init() {
    this._super(...arguments);

    this.setupResize();
    // this.measureScrollbar();
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupElements();
    scheduleOnce('afterRender', this, this.setupScrollbar);
  },

  isHorizontalDragging: false,
  isVerticalDragging: false,
  horizontalHandleSize: null,
  verticalHandleSize: null,
  horizontalHandleOffset: 0,
  verticalHandleOffest: 0,
  dragOffset: 0,

  sizeAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'width' : 'height';
  }),

  scrollContentSize(sizeAttr) {
    return this._scrollContentElement[sizeAttr]();
  },

  contentSize(sizeAttr) {
    return this._contentElement[sizeAttr]();
  },

  measureScrollbar() {

    /**
     * Calculate scrollbar width
     *
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     * Updated to work in Chrome v25.
     */
    function scrollbarWidth() {
      // Append a temporary scrolling element to the DOM, then measure
      // the difference between between its outer and inner elements.
      var tempEl = $('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
      $('body').append(tempEl);
      var width = $(tempEl).innerWidth();
      var widthMinusScrollbars = $('div', tempEl).innerWidth();
      tempEl.remove();
      // On OS X if the scrollbar is set to auto hide it will have zero width. On webkit we can still
      // hide it using ::-webkit-scrollbar { width:0; height:0; } but there is no moz equivalent. So we're
      // forced to sniff Firefox and return a hard-coded scrollbar width. I know, I know...
      if (width === widthMinusScrollbars && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        return 17;
      }
      return (width - widthMinusScrollbars);
    }

    return scrollbarWidth();

  },

  setupScrollbar() {
    this.createScrollbar().map((scrollbar) => {
      this.checkScrolledToBottom(scrollbar);
      if (scrollbar.isNecessary) {
        this.showScrollbar();
      }
    });
  },

  setupElements() {
    this._scrollContentElement = this.$(`${scrollContentSelector}`);
    this._contentElement = this.$(`${contentSelector}:first`);
    // TODO now let's try to support two scroll bars.
    //  maybe some properties called hasHorizontalScrollbar, hasVerticalScrollbar
    // might want to move into a seperate component if we want it to have a different api scrollToX, scrollToY
    this._scrollbarElement = this.$(`${scrollbarSelector}:first`);
  },

  setupResize() {
    this._resizeHandler = () => {
      debounce(this, this.resizeScrollbar, 16);
    };

    window.addEventListener('resize', this._resizeHandler, true);
  },

  resizeScrollContent() {
    const width = this.$().width();
    const height = this.$().height();
    const scrollbarThickness = this.measureScrollbar();

    if (this.get('double')) {
      this.set('scrollContentWidth', width + scrollbarThickness);
      this.set('scrollContentHeight', height + scrollbarThickness);
    } else {
      if (this.get('horizontal')) {
        this.set('scrollContentWidth', width);
        this.set('scrollContentHeight', height + scrollbarThickness);
        this._contentElement.height(height);
      } else {
        this.set('scrollContentWidth', width + scrollbarThickness);
        this.set('scrollContentHeight', height);
      }
    }
  },

  createScrollbar() {
    if (this.get('isDestroyed')) {
      return;
    }
    if (this.get('double')) {
      const horizontalScrollbar = new Horizontal({
        scrollbarElement: this.$(`${scrollbarSelector}.horizontal`),
        contentElement: this._contentElement
      });
      const verticalScrollbar = new Vertical({
        scrollbarElement: this.$(`${scrollbarSelector}.vertical`),
        contentElement: this._contentElement

      });
      this.set('horizontalScrollbar', horizontalScrollbar);
      this.set('verticalScrollbar', verticalScrollbar);
      this.resizeScrollContent();
      this.updateScrollbarAndSetupProperties(0, 'horizontal');
      this.updateScrollbarAndSetupProperties(0, 'vertical');
      return [horizontalScrollbar, verticalScrollbar];
    } else {
      const ScrollbarClass = this.get('horizontal') ? Horizontal : Vertical;
      const propertyName = this.get('horizontal') ? 'horizontal' : 'vertical';
      const scrollbar = new ScrollbarClass({
        scrollbarElement: this._scrollbarElement,
        contentElement: this._contentElement
      });

      this.set(`${propertyName}Scrollbar`, scrollbar);
      this.resizeScrollContent();
      // TODO needed? this.updateScrollbarAndSetupProperties();
      return [scrollbar];
    }
  },

  mouseEnter(){
    if (this.get('autoHide')) {
      this.showScrollbar();
    }
  },

  mouseMove(e){
    if (this.get('autoHide')) {
      this.showScrollbar();
    }
    const eventOffset = e[this.get('eventOffsetAttr')];
    this.set('mouseOffset', eventOffset);
  },

  mouseLeave() {
    this.set('isDragging', false);
  },

  mouseUp() {
    this.set('isDragging', false);
  },

  eventOffsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'pageX' : 'pageY';
  }),


  updateScrollbarAndSetupProperties(scrollOffset, scrollbarDirection) {
    const {handleOffset, handleSize} = this.get(`${scrollbarDirection}Scrollbar`).getHandlePositionAndSize(scrollOffset);
    this.set(`${scrollbarDirection}HandleOffset`, handleOffset + 'px');
    this.set(`${scrollbarDirection}HandleSize`, handleSize + 'px');
  },

  /**
   * Callback for the scroll event emitted by the container of the content that can scroll.
   * Here we update the scrollbar to reflect the scrolled position.
   *
   * @method scrolled
   * @param event
   * @param scrollOffset
   * @param scrollDirection 'vertical' or 'horizontal'
   */
  scrolled(event, scrollOffset, scrollDirection) {
    this.updateScrollbarAndSetupProperties(scrollOffset, scrollDirection);
    this.showScrollbar();

    this.checkScrolledToBottom(this.get(`${scrollDirection}Scrollbar`), scrollOffset);

    this.sendScroll(event, scrollOffset);
  },


  checkScrolledToBottom(scrollbar, scrollOffset) {
    let scrollBuffer = this.get('scrollBuffer');

    if (scrollbar.isScrolledToBottom(scrollBuffer, scrollOffset)) {
      debounce(this, this.sendScrolledToBottom, 100);
    }
  },

  sendScrolledToBottom() {
    this.sendAction('onScrolledToBottom');
  },

  sendScroll(event, scrollOffset) {
    if (this.get('onScroll')) {
      this.sendAction('onScroll', scrollOffset, event);
    }
  },

  resizeScrollbar() {
    let scrollbar = this.get('horizontalScrollbar');
    if (!scrollbar) {
      return;
    }

    this.createScrollbar();
    this.showScrollbar();
  },

  showScrollbar() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('showHandle', true);

    if (!this.get('autoHide')) {
      return;
    }

    debounce(this, this.hideScrollbar, hideDelay);
  },

  hideScrollbar() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('showHandle', false);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().off('transitionend webkitTransitionEnd', this._resizeHandler);
    window.removeEventListener('resize', this._resizeHandler, true);
  },

  drag(dragPerc, scrollProp, sizeAttr) {
    const srcollTo = dragPerc * this.contentSize(sizeAttr);
    this.set(scrollProp, srcollTo);
  },

  startDragging(isDraggingProp) {
    this.set(isDraggingProp, true);
  },

  jumpScroll(jumpPositive, scrollToProp, sizeAttr) {
    const scrollOffset = this.get(scrollToProp);
    let jumpAmt = PAGE_JUMP_MULTIPLE * this.scrollContentSize(sizeAttr);
    let scrollPos = jumpPositive ? scrollOffset - jumpAmt : scrollOffset + jumpAmt;
    this.set(scrollToProp, scrollPos);
  },


  actions: {

    /**
     * Update action should be called when size of the scroll area changes
     */
    recalculate() {
      this.resizeScrollbar();
    },

    /**
     * Can be called when scrollbars changes as a result of value change,
     *
     * for example
     * ```
     * {{#as-scrollable as |scrollbar|}}
     *   {{#each (compute scrollbar.update rows) as |row|}}
     *     {{row.title}}
     *   {{/each}}
     * {{/as-scrollable}}
     * ```
     */
    update(value) {
      scheduleOnce('afterRender', this, this.resizeScrollbar);
      return value;
    },

    /**
     * Scroll Top action should be called when when the scroll area should be scrolled top manually
     */
    scrollTop() {
      this.set('scrollTo', 0);
    },
    scrolled(){
      this.scrolled(...arguments);
    },
    horizontalDrag(dragPerc) {
      this.drag(dragPerc, 'scrollToX', 'width');
    },
    verticalDrag(dragPerc) {
      this.drag(dragPerc, 'scrollToY', 'height');
    },
    horizontalJumpTo(jumpPositive) {
      this.jumpScroll(jumpPositive, 'scrollToX', 'width');
    },
    verticalJumpTo(jumpPositive) {
      this.jumpScroll(jumpPositive, 'scrollToY', 'height');
    },
    horizontalDragStart() {
      this.startDragging('isHorizontalDragging');
    },
    verticalDragStart() {
      this.startDragging('isVerticalDragging');
    }
  }
});
