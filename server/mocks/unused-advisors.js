module.exports = function(app) {
  var express = require('express');
  var unusedAdvisorsRouter = express.Router();

  unusedAdvisorsRouter.get('/', function(req, res) {
    var now = new Date();
    now.setDate(now.getDate() - 5);

    res.send({
      'unused_advisors': [{
        'id': 1,
        'project_id': 1,
        'name': 'Example Advisor 1',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 2,
        'project_id': 1,
        'name': 'Example Advisor 2',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 3,
        'project_id': 1,
        'name': 'Example Advisor 3',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 4,
        'project_id': 1,
        'name': 'Example Advisor 4',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 5,
        'project_id': 1,
        'name': 'Example Advisor 5',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 6,
        'project_id': 1,
        'name': 'Example Advisor 6',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }, {
        'id': 7,
        'project_id': 1,
        'name': 'Example Advisor 7',
        'avatar_url': '/images/default_avatar.png',
        'terms_sent_at': now.toISOString()
      }],

      'projects': [{
        'id': 1,
        'name': 'Example Project'
      }]
    });
  });

  app.use('/swordfish/unused_advisors', unusedAdvisorsRouter);
};
