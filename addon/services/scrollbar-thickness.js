import { computed } from '@ember/object';
import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
  thickness: computed(() => {
    const tempEl = $(`
      <div class="scrollbar-width-tester" style="width: 50px; position: absolute; left: -100px;">
        <div style="overflow: scroll;">
          <div class="scrollbar-width-tester__inner"></div>
        </div>
      </div>
    `);
    $('body').append(tempEl);
    const width = $(tempEl).width();
    const widthMinusScrollbars = $('.scrollbar-width-tester__inner', tempEl).width();
    tempEl.remove();

    return (width - widthMinusScrollbars);
  })
});
