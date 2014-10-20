import Ember from 'ember';
import DS from 'ember-data';

export default {
  name: 'errors',

  initialize: function() {
    DS.Model.reopen({
      adapterDidInvalidate: function(errors) {
        var recordErrors = this.get('errors');

        for (var key of Object.keys(errors)) {
          recordErrors.add(key, errors[key]);
        }
      }
    });

    Ember.ObjectController.reopen({
      save: function(model) {
        return model.save().then((function() {}), () => {
          return this.send('openErrorsModal', model.get('errors'));
        });
      }
    });
  }
};
