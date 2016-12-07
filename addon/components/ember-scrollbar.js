import Ember from 'ember';
import layout from '../templates/components/ember-scrollbar';
import {styleify} from '../util/css';

const {
  computed,
  isPresent,
  K
} = Ember;

const handleSelector = '.drag-handle';

/**
 * Handles displaying and moving the handle within the confines of it's template.
 * Has callbacks for intending to dragging and jump to particular positions.
 *
 * @class EmberScrollbar
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNameBindings: [':tse-scrollbar'],
  onDrag: K,
  onJumpTo: K,
  onDragStart: K,

  horizontal: false,
  isDragging: false,
  showHandle: false,
  handleSize: null,
  handleOffset: 0,

  offsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'left' : 'top';
  }),

  jumpScrollOffsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'offsetX' : 'offsetY';
  }),

  eventOffsetAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'pageX' : 'pageY';
  }),

  sizeAttr: computed('horizontal', function() {
    return this.get('horizontal') ? 'width' : 'height';
  }),


  handleStylesJSON: computed('handleOffset', 'handleSize', 'horizontal', function() {
    const {handleOffset, handleSize} = this.getProperties('handleOffset', 'handleSize');
    if (this.get('horizontal')) {
      return {left: handleOffset, width: handleSize};
    } else {
      return {top: handleOffset, height: handleSize};
    }
  }),

  handleStyles: computed('handleStylesJSON.{top,left,width,height}', function() {
    return styleify(this.get('handleStylesJSON'));
  }),


  mouseDown(e) {
    this.jumpScroll(e);
  },


  startDrag(e) {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();

    const dragOffset = this._startDrag(e);
    this.set('dragOffset', dragOffset);
    this.get('onDragStart')(e);
  },

  mouseMove(e) {
    if (this.get('isDragging')) {
      this.drag(e);
    }
  },

  mouseUp() {
    this.endDrag();
  },


  didReceiveAttrs() {
    const mouseOffset = this.get('mouseOffset');
    if (isPresent(mouseOffset)) {
      if (this.get('isDragging')) {
        this._drag(mouseOffset, this.get('dragOffset'));
      }
    }
  },

  /**
   * Drag scrollbar handle
   */
  drag(e) {
    e.preventDefault();

    let eventOffset = this._eventOffset(e);
    this._drag(eventOffset, this.get('dragOffset'));
  },

  endDrag() {
    this.set('isDragging', false);
  },

  /**
   * Handles when user clicks on scrollbar, but not on the actual handle, and the scroll should
   * jump to the selected position.
   *
   * @method jumpScroll
   * @param e
   */
  jumpScroll(e) {
    // If the drag handle element was pressed, don't do anything here.
    if (e.target === this.$(handleSelector)[0]) {
      return;
    }
    this._jumpScroll(e);
  },


  // private stuff
  /**
   * Convert the mouse position into a percentage of the scrollbar height/width.
   * and sends to parent
   *
   * @param e
   * @param dragOffset
   * @private
   */
  _drag(eventOffset, dragOffset) {
    let dragPos = eventOffset - this._scrollbarOffset() - dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / this._scrollbarSize();
    this.get('onDrag')(dragPerc);
  },

  /**
   * sends direction and scroll offset
   * @param e
   * @private
   */
  _jumpScroll(e) {
    let eventOffset = this._jumpScrollEventOffset(e);
    let handleOffset = this._handlePositionOffset();
    const jumpPositive = (eventOffset < handleOffset);

    this.get('onJumpTo')(jumpPositive, e);
  },


  _startDrag(e) {
    return this._eventOffset(e) - this._handleOffset();
  },


  _handleOffset() {
    return this.$(handleSelector).offset()[this.get('offsetAttr')];
  },


  _handlePositionOffset() {
    return this.$(handleSelector).position()[this.get('offsetAttr')];
  },

  _scrollbarOffset() {
    return this.$().offset()[this.get('offsetAttr')];
  },

  /**
   * Returns the offset from the anchor point derived from this MouseEvent
   * @param e MouseEvent
   * @return {Number}
   */
  _jumpScrollEventOffset(e) {
    return e[this.get('jumpScrollOffsetAttr')];
  },


  _eventOffset(e) {
    return e[this.get('eventOffsetAttr')];
  },


  _scrollbarSize() {
    return this.$()[this.get('sizeAttr')]();
  },

  actions: {
    startDrag(){
      this.startDrag(...arguments);
    },
    jumpScroll() {
      this.jumpScroll(...arguments);
    }
  }

});
