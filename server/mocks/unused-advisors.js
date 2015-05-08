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
