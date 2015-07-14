import Form from 'phoenix/forms/form';

export default Form.extend({
  genericErrorMessage: 'There has been an error with the feature.',

  setDefaultValues: function(){
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      name: this.get('name'),
      briefDescription: this.get('briefDescription'),
      limit: this.get('limit'),
      description: this.get('description')
    });
  },
});
