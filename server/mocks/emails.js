module.exports = function(app) {
  var express = require('express');
  var emailsRouter = express.Router();

  emailsRouter.get('/', function(req, res) {
    res.send({
      'emails': [
        {
          'id' 1,
          'subject': 'This is an email subject',
          'body': 'Emails are fun!',
          'sender': 'sender@email.com',
          'recipients': [
            'recipient@email.com'
          ],
          'cced_emails': [
            'cc@email.com'
          ],
          'sent_at': '2015-06-02T10:30:00.000+00:00'
        }
      ]
    });
  });

  app.use('/api/emails', emailsRouter);
};
