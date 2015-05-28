import Ember from 'ember';
import PromiseController from 'phoenix/controllers/promise';
import { request } from 'ic-ajax';
import notify from 'phoenix/helpers/notify';

export default Ember.Object.extend({
  cancel: function(model, successCallback) {
    var requestPromise = PromiseController.create({
      promise: request({
        url: `${EmberENV.apiBaseUrl}/interests/${model.get('id')}`,
        type: 'DELETE'
      }).then(successCallback, () => {
        notify('The interaction could not be cancelled.', 'error');
      })
    });

    return requestPromise;
  }
});
