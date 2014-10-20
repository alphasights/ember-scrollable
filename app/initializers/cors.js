import Ember from 'ember';

export default {
  name: 'cors',

  initialize: function() {
    Ember.$.ajaxPrefilter(function(options) {
      options.crossDomain = true;
      options.xhrFields = { withCredentials: true };

      options.headers = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };
    });
  }
};
