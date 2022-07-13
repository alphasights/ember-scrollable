import Service from '@ember/service';
import { getWidth } from 'ember-scrollable/util/measurements';

export default class ScrollbarThicknessService extends Service {
  constructor() {
    super(...arguments);

    this.thickness = this.calculateScrollbarThickness();
  }

  calculateScrollbarThickness() {
    let tempEl = document.createElement('div');
    tempEl.setAttribute(
      'style',
      'width: 50px; position: absolute; left: -100px;'
    );
    tempEl.classList.add('scrollbar-width-tester');
    tempEl.innerHTML = `<div style="overflow: scroll;"><div class="scrollbar-width-tester__inner"></div></div>`;
    document.body.appendChild(tempEl);

    let width = getWidth(tempEl);
    let widthMinusScrollbars = getWidth(
      tempEl.querySelector('.scrollbar-width-tester__inner')
    );

    tempEl.remove();

    return width - widthMinusScrollbars;
  }
}
