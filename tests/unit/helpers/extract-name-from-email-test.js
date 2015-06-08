import {
  extractNameFromEmail
} from '../../../helpers/extract-name-from-email';
import { module, test } from 'qunit';

module('ExtractNameFromEmailHelper');

test("it returns the person's name when one is provided", function(assert) {
  var rawEmailAddress = 'John Kelly Ferguson <john.ferguson@alphasights.com>';

  assert.equal(extractNameFromEmail(rawEmailAddress), 'John Kelly Ferguson');
});

test("it returns the person's email when there is no name", function(assert) {
  var rawEmailAddress = 'john.ferguson@alphasights.com';

  assert.equal(extractNameFromEmail(rawEmailAddress), 'john.ferguson@alphasights.com');
});
