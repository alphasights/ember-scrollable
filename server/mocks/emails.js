module.exports = function(app) {
  var express = require('express');
  var emailsRouter = express.Router();

  emailsRouter.get('/', function(req, res) {
    res.send({
      'emails': [
        {
          'id': 1,
          'subject': 'This is an email subject',
          'body': 'Emails are fun!',
          'sender': 'analyst@email.com',
          'recipients': [
            'advisor@email.com'
          ],
          'cc': [
            'cc@email.com'
          ],
          'sent_at': '2015-06-02T10:30:00.000+00:00',
          'outgoing': true
        },
        {
          'id': 2,
          'subject': 'This is another email subject',
          'body': 'Emails are boring!',
          'sender': 'advisor@email.com',
          'recipients': [
            'analyst@email.com'
          ],
          'cc': [
            'cc@email.com'
          ],
          'sent_at': '2015-06-02T11:30:00.000+00:00',
          'outgoing': false
        }
      ]
    });
  });

  app.use('/api/v1/emails', emailsRouter);
};
