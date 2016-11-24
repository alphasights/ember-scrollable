import Ember from 'ember';
const {
  String: { camelize }
} = Ember;

const pageJumpMultp = 7/8;

export default class Scrollable {
  constructor(options) {
    this.scrollContentElement = options.scrollContentElement;
    this.scrollbarElement     = options.scrollbarElement;
    this.handleElement        = options.handleElement;
    this.contentElement       = options.contentElement;

    this.width                = options.width;
    this.height               = options.height;
    this.scrollbarWidth       = options.scrollbarWidth;
  }

  get isNecessary() {
    return this.scrollbarSize() < this.contentOuterSize();
  }

  startDrag(e) {
    this.dragOffset = this.eventOffset(e) - this.handleOffset();
  }

  handleOffset() {
    return this.handleElement.offset()[this.offsetAttr];
  }

  handlePositionOffset() {
    return this.handleElement.position()[this.offsetAttr];
  }

  scrollbarOffset() {
    return this.scrollbarElement.offset()[this.offsetAttr];
  }

  scrollbarSize() {
    return this.scrollbarElement[this.sizeAttr]();
  }

  contentSize() {
    return this.contentElement[this.sizeAttr]();
  }

  contentOuterSize() {
    return this.contentElement[camelize(`outer-${this.sizeAttr}`)]();
  }

  scrollTo(scrollPos) {
    this.scrollContentElement[this.scrollOffsetAttr](scrollPos);
  }

  scrollOffset() {
    return this.scrollContentElement[this.scrollOffsetAttr]();
  }

  scrollContentSize() {
    return this.scrollContentElement[this.sizeAttr]();
  }

  drag(e) {
    let eventOffset = this.eventOffset(e);

    let dragPos = eventOffset - this.scrollbarOffset() - this.dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / this.scrollbarSize();
    // Scroll the content by the same percentage.
    let scrollPos = dragPerc * this.contentSize();

    this.scrollTo(scrollPos);
  }

  jumpScroll(e) {
    // The content will scroll by 7/8 of a page.
    let jumpAmt = pageJumpMultp * this.scrollContentSize();

    let eventOffset = this.jumpScrollEventOffset(e);
    let handleOffset = this.handlePositionOffset();
    let scrollOffset = this.scrollOffset();

    let scrollPos = (eventOffset < handleOffset) ? scrollOffset - jumpAmt : scrollOffset + jumpAmt;

    this.scrollTo(scrollPos);
  }

  update() {
    let scrollOffset = this.scrollOffset();
    let contentSize = this.contentOuterSize();
    let scrollbarSize = this.scrollbarSize();
    let scrollbarRatio = scrollbarSize / contentSize;

    // Calculate new height/position of drag handle.
    // Offset of 2px allows for a small top/bottom or left/right margin around handle.
    let handleOffset = Math.round(scrollbarRatio * scrollOffset) + 2;

    let handleSize = 0;

    // check if content is scrollbar is longer than content
    if (scrollbarRatio < 1) {
      let handleSizeCalculated = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;
      // check if handleSize is too small
      handleSize = handleSizeCalculated < 10 ? 10 : handleSizeCalculated;
    }

    this.updateHandle(handleOffset, handleSize);
   }

   isScrolledToBottom(scrollBuffer = 0) {
     let scrollOffset = this.scrollOffset();
     let contentSize = this.contentOuterSize();
     let scrollbarSize = this.scrollbarSize();

     return scrollOffset + scrollbarSize + scrollBuffer >= contentSize;
   }

   remove() {
     this.scrollContentElement.width('');
     this.scrollContentElement.height('');
   }

}

export class Vertical extends Scrollable {
  constructor(options) {
    super(options);

    this.scrollOffsetAttr = 'scrollTop';
    this.offsetAttr = 'top';
    this.sizeAttr = 'height';

    this.resizeScrollContent();
    this.update();
  }

  resizeScrollContent() {
    this.scrollContentElement.width(this.width + this.scrollbarWidth);
    this.scrollContentElement.height(this.height);
  }

  eventOffset(e) {
    return e.pageY;
  }

  /**
   * Returns the offset from the anchor point derived from this MouseEvent
   * @param e MouseEvent
   * @return {Number}
   */
  jumpScrollEventOffset(e) {
    return e.layerY;
  }

  updateHandle(top, height) {
    this.handleElement.css({ top, height });
  }
}

export class Horizontal extends Scrollable {
  constructor(options) {
    super(options);

    this.scrollOffsetAttr = 'scrollLeft';
    this.offsetAttr = 'left';
    this.sizeAttr = 'width';

    this.resizeScrollContent();
    this.update();
  }

  resizeScrollContent() {
    this.scrollContentElement.width(this.width);
    this.scrollContentElement.height(this.height + this.scrollbarWidth);
    this.contentElement.height(this.height);
  }

  eventOffset(e) {
    return e.pageX;
  }

  /**
   * Returns the offset from the anchor point derived from this MouseEvent
   * @param e MouseEvent
   * @return {Number}
   */
  jumpScrollEventOffset(e) {
    return e.layerX;
  }

  updateHandle(left, width) {
    this.handleElement.css({ left, width });
  }
}

