import { action, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { throttle } from '@ember/runloop';
import Component from '@ember/component';
import template from '../templates/components/ember-scrollbar';
import { styleify } from '../util/css';
import { THROTTLE_TIME_LESS_THAN_60_FPS_IN_MS } from './ember-scrollable';
import { capitalize } from '@ember/string';
import classic from 'ember-classic-decorator';
import { layout, tagName } from '@ember-decorators/component';

const handleSelector = '.drag-handle';

/**
 * Handles displaying and moving the handle within the confines of it's template.
 * Has callbacks for intending to dragging and jump to particular positions.
 *
 * @class EmberScrollbar
 * @extends Ember.Component
 */
@classic
@layout(template)
@tagName('')
export default class EmberScrollbarComponent extends Component {
  onDrag() {}
  onJumpTo() {}
  onDragStart() {}
  onDragEnd() {}

  horizontal = false;
  handleSize = null;
  handleOffset = 0;

  @computed('horizontal')
  get offsetAttr() {
    return this.horizontal ? 'left' : 'top';
  }

  @computed('horizontal')
  get jumpScrollOffsetAttr() {
    return this.horizontal ? 'offsetX' : 'offsetY';
  }

  @computed('horizontal')
  get eventOffsetAttr() {
    return this.horizontal ? 'pageX' : 'pageY';
  }

  @computed('horizontal')
  get sizeAttr() {
    return this.horizontal ? 'width' : 'height';
  }

  @computed('handleOffset', 'handleSize', 'horizontal')
  get handleStylesJSON() {
    const { handleOffset, handleSize } = this;
    if (this.horizontal) {
      return { left: handleOffset + 'px', width: handleSize + 'px' };
    } else {
      return { top: handleOffset + 'px', height: handleSize + 'px' };
    }
  }

  @computed('handleStylesJSON.{top,left,width,height}')
  get handleStyles() {
    return styleify(this.handleStylesJSON);
  }

  @action
  startDrag(e) {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();
    e.stopPropagation();

    const dragOffset = this._startDrag(e);
    this.set('dragOffset', dragOffset);
    this.onDragStart(e);
  }

  @action
  elementInserted(element) {
    this.el = element;

    this._mousemoveListener = (e) => {
      throttle(
        this,
        this.updateMouseOffset,
        e,
        THROTTLE_TIME_LESS_THAN_60_FPS_IN_MS
      );
    };

    this.el.addEventListener('mousedown', this.jumpScroll);
    this.el.addEventListener('mouseup', this.endDrag);

    window.addEventListener('mousemove', this._mousemoveListener);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.el?.removeEventListener('mousedown', this.jumpScroll);
    this.el?.removeEventListener('mouseup', this.endDrag);

    window.removeEventListener('mousemove', this._mousemoveListener);
  }

  @action
  endDrag() {
    this.onDragEnd();
  }

  /**
   * Callback for the mouse move event. Update the mouse offsets given the new mouse position.
   *
   * @method updateMouseOffset
   * @param e
   * @private
   */
  @action
  updateMouseOffset(e) {
    const { pageX, pageY } = e;
    const mouseOffset = this.horizontal ? pageX : pageY;

    if (this.isDragging && isPresent(mouseOffset)) {
      this._drag(mouseOffset, this.dragOffset);
    }
  }

  /**
   * Handles when user clicks on scrollbar, but not on the actual handle, and the scroll should
   * jump to the selected position.
   *
   * @method jumpScroll
   * @param e
   */
  @action
  jumpScroll(e) {
    // If the drag handle element was pressed, don't do anything here.
    if (e.target === this.el.querySelector(handleSelector)) {
      return;
    }
    this._jumpScroll(e);
  }

  // private methods
  /**
   * Convert the mouse position into a percentage of the scrollbar height/width.
   * and sends to parent
   *
   * @param eventOffset
   * @param dragOffset
   * @private
   */
  @action
  _drag(eventOffset, dragOffset) {
    const scrollbarOffset = this._scrollbarOffset();
    let dragPos = eventOffset - scrollbarOffset - dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / this._scrollbarSize();
    this.onDrag(dragPerc);
  }

  /**
   * Calls `onJumpTo` action with a boolean indicating the direction of the jump, and the jQuery MouseDown event.
   *
   * If towardsAnchor is true, the jump is in a direction towards from the initial anchored position of the scrollbar.
   *  i.e. for a vertical scrollbar, towardsAnchor=true indicates moving upwards, and towardsAnchor=false is downwards
   *       for a horizontal scrollbar, towardsAnchor=true indicates moving left, and towardsAnchor=false is right
   *
   * @param e
   * @private
   */
  @action
  _jumpScroll(e) {
    let eventOffset = this._jumpScrollEventOffset(e);
    let handleOffset = this._handlePositionOffset();
    const towardsAnchor = eventOffset < handleOffset;

    this.onJumpTo(towardsAnchor, e);
  }

  @action
  _startDrag(e) {
    return this._eventOffset(e) - this._handleOffset();
  }

  @action
  _handleOffset() {
    return this.el.querySelector(handleSelector).getBoundingClientRect()[
      this.offsetAttr
    ];
  }

  @action
  _handlePositionOffset() {
    let el = this.el.querySelector(handleSelector);
    let position = {
      left: el.offsetLeft,
      top: el.offsetTop,
    };

    return position[this.offsetAttr];
  }

  @action
  _scrollbarOffset() {
    return this.el.getBoundingClientRect()[this.offsetAttr];
  }

  /**
   * Returns the offset from the anchor point derived from this MouseEvent
   * @param e MouseEvent
   * @return {Number}
   */
  @action
  _jumpScrollEventOffset(e) {
    return e[this.jumpScrollOffsetAttr];
  }

  @action
  _eventOffset(e) {
    return e[this.eventOffsetAttr];
  }

  @action
  _scrollbarSize() {
    return this.el[`offset${capitalize(this.sizeAttr)}`];
  }
}
