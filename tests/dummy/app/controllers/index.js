/* eslint-disable no-console */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked isShort = true;

  @action
  log(message) {
    console.log(message);
  }

  @action
  toggleHeight() {
    this.isShort = !this.isShort;
  }
}
