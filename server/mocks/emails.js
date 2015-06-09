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
          'sender': 'Johnny Analyst <analyst@email.com>',
          'recipients': [
            'Billy Advisor <advisor@email.com>'
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
          'sender': 'Billy Advisor <advisor@email.com>',
          'recipients': [
            'Johnny Analyst <analyst@email.com>'
          ],
          'cc': [
            'cc@email.com'
          ],
          'sent_at': '2015-06-02T11:30:00.000+00:00',
          'outgoing': false
        }
      ],
      'meta': {
        'page': 1,
        'per_page': 10,
        'total_count': 2,
        'total_pages': 1
      }
    });
  });

  app.use('/api/v1/emails', emailsRouter);
};
