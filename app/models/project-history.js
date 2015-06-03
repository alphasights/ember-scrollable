import DS from 'ember-data';
import Ember from 'ember';

const STATUSES = {
  'found': 'Found',
  'used_by_client': 'Used by client',
  'not_right': 'Not right',
  'available_to_client': 'Available to client',
  'partial_terms': 'Partial terms',
  'sent_terms': 'Sent terms',
  'contacted': 'Contacted',
  'outreach_cleared': 'Outreach cleared',
  'outreach_forbidden': 'Outreach forbidden',
  'do_not_call': 'Do not call',
  'not_on_CID': 'Not on CID',
  'some_companies_on_CID': 'Some companies on CID',
  'all_companies_on_CID': 'All companies on CID'
}

export default DS.Model.extend({
  termsAcceptedAt: DS.attr('date'),
  outreachStatus: DS.attr('string'),
  project: DS.belongsTo('project'),

  humanizedOutreachStatus: Ember.computed('outreachStatus', function(){
    return STATUSES[this.get('outreachStatus')];
  }),

  outreachStatusClass: Ember.computed('outreachStatus', function(){
    return this.get('outreachStatus').underscore().dasherize();
  }),
});
