import ActionComponent from 'phoenix/components/as-action';

export default ActionComponent.extend({
  classNameBindings: [':form-submission-action'],
  form: null,

  perform: function() {
    this.get('form').send('submit');
  }
});
