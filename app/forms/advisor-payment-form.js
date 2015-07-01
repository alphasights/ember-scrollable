import Form from 'phoenix/forms/form';

export default Form.extend({
  genericErrorMessage: 'There has been an error with the advisor payment.',

  setDefaultValues: function() {
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      paymentRequired: model.get('paymentRequired')
    });
  }
});
