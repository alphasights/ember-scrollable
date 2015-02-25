import Ember from 'ember';

const typeToTaskMap = {
  termsOfEngagement: "Obtain Advisor's agreement to ToE",
  advisorVettingTest: "Vet Advisor",
  complianceOfficerNotification: "Notify Compliance of upcoming Interaction",
  complianceOfficerApproval: "Obtain Compliance Approval",
  complianceOfficerChaperone: "BCC Compliance on Calendar Invite",
  internalProfileCheck: "Internal Profile Check",
  bainInteractionConfirmation: "Send Bain confirmation email",
  careerHistoryConfirmation: "Obtain Advisor's career history approval",
  careerHistoryNotification: "Notify client compliance the career history has changed",
  clientOversightQuestion: "Client Oversight Question"
};

export default Ember.ObjectController.extend({
  task: function() {
    return typeToTaskMap[this.get('type')];
  }.property('type')
});
