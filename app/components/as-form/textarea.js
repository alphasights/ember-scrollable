import FormFieldMixin from 'phoenix/mixins/form-field';
import Ember from 'ember';

export default Ember.Component.extend(FormFieldMixin, {
  classNameBindings: [':form-textarea']
});
