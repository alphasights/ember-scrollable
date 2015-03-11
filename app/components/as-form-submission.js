import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['submission'],
  formSubmitted: Ember.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save'
});
