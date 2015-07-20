import Ember from 'ember';
import PromiseController from 'phoenix/controllers/promise';
import { request } from 'ic-ajax';
import notify from 'phoenix/helpers/notify';

export default Ember.Object.extend({
  cancel: function(model, successCallback, withdrawFromCompliance = false) {
    var params = `withdraw_from_compliance=${withdrawFromCompliance}`;

    var requestPromise = PromiseController.create({
      promise: request({
        url: `${EmberENV.apiBaseUrl}/interests/${model.get('id')}?${params}`,
        type: 'DELETE'
      }).then(successCallback, () => {
        notify('The request could not be cancelled.', 'error');
      })
    });

    return requestPromise;
  }
});
