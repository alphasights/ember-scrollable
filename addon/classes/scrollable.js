import Ember from 'ember';
const {
  String: {camelize}
} = Ember;


export default class Scrollable {
  constructor(options) {
    this.scrollbarElement = options.scrollbarElement;
    this.contentElement = options.contentElement;
  }

  get isNecessary() {
    return this.scrollbarSize() < this.contentOuterSize();
  }


  scrollbarSize() {
    return this.scrollbarElement[this.sizeAttr]();
  }

  contentOuterSize() {
    return this.contentElement[camelize(`outer-${this.sizeAttr}`)]();
  }

  getHandlePositionAndSize(scrollOffset) {
    // we own this data
    let contentSize = this.contentOuterSize();
    // we pass this to the child
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

    return {handleOffset, handleSize};
  }

  isScrolledToBottom(scrollBuffer, scrollOffset) {
    let contentSize = this.contentOuterSize();
    let scrollbarSize = this.scrollbarSize();

    return scrollOffset + scrollbarSize + scrollBuffer >= contentSize;
  }

}

export class Vertical extends Scrollable {
  constructor(options) {
    super(options);

    this.offsetAttr = 'top';
    this.sizeAttr = 'height';
  }
}

export class Horizontal extends Scrollable {
  constructor(options) {
    super(options);

    this.offsetAttr = 'left';
    this.sizeAttr = 'width';
  }
}

