import resolver from './helpers/resolver';
import registerSelectHelper from 'emberx-select/helpers/register-select-helper';
import startApp from './helpers/start-app';
import Fixtures from './helpers/fixtures';
import Ember from 'ember';

registerSelectHelper();

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

export default {
  beforeEach: function() {
    this.app = startApp();
    this.app.fixtures = Fixtures.create();

    this.app.fixtures.define('GET', '/users/me', {
      response: {
        "user": {
          "name": "Example User",
          "initials": "EU",
          "id": 1,
          "teamId": 1,
          "avatarUrl": Fixtures.EMPTY_IMAGE_URL,
          "timeZone": "Etc/UTC",
          "email": 'example@user.com'
        }
      }
    });

    this.app.fixtures.define('GET', '/delivery_performances/me', { response: {
      "delivery_performance": {
        "id": 1,
        "user_id": 1,
        "current_month_credit_count": 0,
        "monthly_target": 0
      }
    }});

    this.app.fixtures.define('GET', '/interactions', { params: { primary_contact_id: "1" }, response: {
      "interactions": []
    }});

    this.app.fixtures.define('GET', '/teams', { response: {
      "teams": [{
        "name": "Example Team",
        "id": 1,
        "office": "Example Office"
      }, {
        "name": "Example Team 2",
        "id": 2,
        "office": "Example Office"
      }]
    }});

    this.app.fixtures.define('GET', '/unused_advisors', { response: {
      "unused_advisors": []
    }});

    this.app.fixtures.define('GET', '/interaction_types', { response: {
      "interaction_types": {
        "call": "One-on-one Call",
        "half_hour_call": "Half-Hour Call",
        "follow_up": "Reduced credit Follow up Call",
        "multi_party_call": "Multiparty Call",
        "hosted_call": "Hosted Call",
        "interpreted_call": "Translated Call",
        "meeting": "One-on-one Meeting",
        "multi_party_event": "Multiparty Meeting",
        "free_follow_up": "Free Follow up Call",
        "free_call": "Free Call",
        "workshop": "Workshop",
        "short_term_advisory": "Advisory Work",
        "advisor_embargo": "Advisor Embargo",
        "direct_engagement": "Direct Engagement - Non-exclusive",
        "committed_engagement": "Direct Engagement - Exclusive",
        "longer_term_relationship": "Longer Term Contract",
        "industry_survey": "Industry Survey",
        "summarised_call": "Interaction Summary",
        "industry_expert_report": "Industry Expert Report",
        "custom_half_hour_call": "Custom Half-Hour Call",
        "senior_executive_introduction": "Senior Executive Introduction",
        "advisor_day": "Advisor Day(s)",
        "advisory_event": "Advisory Event",
        "operating_partner_event": "Operating Partner Event",
        "employment_event": "Employment Event",
        "transaction_event": "Transaction Event",
        "long_term": "Advisory Work",
        "report": "Report",
        "full_time": "Full-time Placement"
      },
      "classifications": {
        "hosted_interaction": ["hosted_call", "summarised_call"],
        "duration_based": ["call", "half_hour_call", "follow_up", "meeting", "hosted_call", "interpreted_call", "free_follow_up", "free_call"],
        "custom_credit": ["advisor_day", "custom_half_hour_call", "industry_expert_report", "industry_survey", "multi_party_call", "multi_party_event", "senior_executive_introduction", "short_term_advisory", "summarised_call", "workshop"],
        "fixed_credit": ["advisor_embargo", "committed_engagement", "direct_engagement", "longer_term_relationship"],
        "non_credit": ["advisory_event", "employment_event", "full_time", "long_term", "operating_partner_event", "report", "transaction_event"],
        "scheduled_call_time_optional": ["advisor_embargo", "advisory_event", "committed_engagement", "direct_engagement", "employment_event", "full_time", "industry_expert_report", "industry_survey", "long_term", "longer_term_relationship", "operating_partner_event", "report", "senior_executive_introduction", "short_term_advisory", "transaction_event"]
      }
    }});

    this.app.fixtures.define('GET', '/dial_ins', { response: {
      "dial_ins":{
        "AU":"Australia",
        "AT":"Austria",
        "BE":"Belgium"
      }
    }});
  },

  afterEach: function() {
    /* jshint newcap: false */
    Messenger().hideAll();
    /* jshint newcap: true */

    this.app.fixtures.destroy();
    Ember.run(this.app, this.app.destroy);
  }
};
