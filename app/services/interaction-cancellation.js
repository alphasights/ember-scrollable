import Ember from 'ember';
import PromiseController from 'phoenix/controllers/promise';
import { request } from 'ic-ajax';
import notify from 'phoenix/helpers/notify';

export default Ember.Object.extend({
  cancel: function(model, successCallback, withdrawFromCompliance = false) {
    var requestPromise = PromiseController.create({
      promise: request({
        url: `${EmberENV.apiBaseUrl}/interests/${model.get('id')}`,
        type: 'DELETE',
        data: { send_compliance_notification: withdrawFromCompliance }
      }).then(successCallback, () => {
        notify('The interaction could not be cancelled.', 'error');
      })
    });

    return requestPromise;
  }
});
