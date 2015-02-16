import Ember from 'ember';

export default Ember.Mixin.create({
  index: null,
  navigableModels: null,
  modelRouteParams: [],

  onInit: function() {
    var models = this.get('navigableModels');
    this.set('index', models.indexOf(this.get('model')));
  }.on('init'),

  navigate: function(step) {
    var models = this.get('navigableModels');
    var newModelIndex = this.get('index') + step;

    if (newModelIndex < 0) {
      newModelIndex = models.length + newModelIndex;
    }

    var newModel = models.objectAt(newModelIndex % models.length);

    this.set('index', newModelIndex);
    this.transitionToRoute(...this.get('modelRouteParams').concat(newModel.get('id')));
  },

  actions: {
    previous: function() {
      this.navigate(-1);
    },

    next: function() {
      this.navigate(1);
    }
  }
});
