module.exports = function(app) {
  var express = require('express');
  var projectHistoryRouter = express.Router();

  projectHistoryRouter.get('/', function(req, res) {
    res.send({
      'project-history': [{
        'id': 1,
        'project_id': 1,
        'terms_accepted_at': '2015-06-02T11:30:00.000+00:00',
        'outreach_status': 'found'
      }, {
        'id': 2,
        'project_id': 2,
        'terms_accepted_at': '2015-06-02T12:30:00.000+00:00',
        'outreach_status': 'used_by_client'
      }],

      'projects': [{
        'id': 1,
        'name': 'External name',
        'codename': 'Internal name',
      }, {
        'id': 2,
        'name': 'External name 2',
        'codename': 'Internal name 2',
      }]
    });
  });

  app.use('/swordfish/project_history', projectHistoryRouter);
};
