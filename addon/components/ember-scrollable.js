import Ember from 'ember';
import InboundActionsMixin from 'ember-component-inbound-actions/inbound-actions';
import layout from '../templates/components/ember-scrollable';
import { Horizontal, Vertical } from '../classes/scrollable';

const {
  run: { scheduleOnce, debounce, bind },
  computed
} = Ember;

const scrollbarSelector = '.tse-scrollbar';
const handleSelector = '.drag-handle';
const scrollContentSelector = '.tse-scroll-content';
const contentSelector = '.tse-content';

export default Ember.Component.extend(InboundActionsMixin, {
  layout,
  classNameBindings: [':ember-scrollable', ':tse-scrollable', 'horizontal:horizontal:vertical'],

  horizontal: false,
  autoHide: true,
  scrollBuffer: 50,

  selector: computed('elementId', function(){
    return `#${this.elementId}`;
  }),

  init() {
    this._super(...arguments);

    this.setupResize();
    this.measureScrollbar();
  },

  didInsertElement() {
    this._super(...arguments);

    this.setupElements();

    if (this.get('autoHide')) {
      this.on('mouseEnter', this, this.showScrollbar);
    }
    
    this._handleElement.on('mousedown', bind(this, this.startDrag));
    this._scrollbarElement.on('mousedown', bind(this, this.jumpScroll));
    this._scrollContentElement.on('scroll', bind(this, this.scrolled));

    scheduleOnce('afterRender', this, this.setupScrollbar);
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

    this._scrollbarWidth = scrollbarWidth();

  },

  didInsertElement() {
    this._super(...arguments);

    this.setupElements();

    if (this.get('autoHide')) {
      this.on('mouseEnter', this, this.showScrollbar);
    }
    
    this._handleElement.on('mousedown', bind(this, this.startDrag));
    this._scrollbarElement.on('mousedown', bind(this, this.jumpScroll));
    this._scrollContentElement.on('scroll', bind(this, this.scrolled));

    scheduleOnce('afterRender', this, this.setupScrollbar);
  },

  setupScrollbar() {
    let scrollbar = this.createScrollbar();

    this.set('scrollbar', scrollbar);

    this.checkScrolledToBottom();

    if (scrollbar.isNecessary) {
      this.showScrollbar();    
    }
  },

  setupElements() {
    this._scrollContentElement = this.$(`${scrollContentSelector}`);
    this._scrollbarElement = this.$(`${scrollbarSelector}:first`);
    this._handleElement = this.$(`${handleSelector}:first`);
    this._contentElement = this.$(`${contentSelector}:first`);
  },

  setupResize() {
    this._resizeHandler = () => {
      debounce(this, this.resizeScrollbar, 16);
    };
    
    window.addEventListener('resize', this._resizeHandler, true);
  },

  createScrollbar() {
    let ScrollbarClass = this.get('horizontal') ? Horizontal : Vertical;

    return new ScrollbarClass({
      scrollContentElement: this._scrollContentElement,
      scrollbarElement: this._scrollbarElement,
      handleElement: this._handleElement,
      contentElement: this._contentElement,

      width: this.$().width(),
      height: this.$().height(),
      scrollbarWidth: this._scrollbarWidth
    });
  },

  startDrag(e) {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();

    this.get('scrollbar').startDrag(e);

    this.on('mouseMove', this, this.drag);
    this.on('mouseUp', this, this.endDrag);
  },

  /**
  * Drag scrollbar handle
  */
  drag(e) {
    e.preventDefault();

    this.get('scrollbar').drag(e);
  },

  endDrag() {
    this.off('mouseMove', this, this.drag);
    this.off('mouseUp', this, this.endDrag);
  },

  jumpScroll(e) {
    // If the drag handle element was pressed, don't do anything here.
    if (e.target === this._handleElement[0]) {
      return;
    }

    this.get('scrollbar').jumpScroll(e);
  },

  scrolled() {
    this.get('scrollbar').update();
    this.showScrollbar();

    this.checkScrolledToBottom();
  },

  checkScrolledToBottom() {
    let scrollBuffer = this.get('scrollBuffer');
    
    if (this.get('scrollbar').isScrolledToBottom(scrollBuffer)) {
      debounce(this, this.sendScrolledToBottom, 100);
    }
  },

  sendScrolledToBottom() {
    this.sendAction('onScrolledToBottom');
  },

  resizeScrollbar() {
    let scrollbar = this.get('scrollbar');
    if (!scrollbar) {
      return;
    }

    scrollbar = this.createScrollbar();
    this.set('scrollbar', scrollbar);

    this.showScrollbar();
  },

  showScrollbar() {
    if (this.isDestroyed) {
      return;
    }
    this.set('showHandle', true);

    if (!this.get('autoHide')) {
      return;
    }

    debounce(this, this.hideScrollbar, 1000);
  },

  hideScrollbar() {
    if (this.isDestroyed) {
      return;
    }
    this.set('showHandle', false);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().off('transitionend webkitTransitionEnd', this._resizeHandler);
    window.removeEventListener('resize', this._resizeHandler, true);
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
    }
  }
});