module.exports = function(app) {
  var express = require('express');
  var emailsRouter = express.Router();

  emailsRouter.get('/', function(req, res) {
    if (req.originalUrl.indexOf('page=1') > -1) {
      res.send({
        'emails': [
          {
            'id': 1,
            'subject': 'This is an email subject',
            'body': 'Emails are <b>fun!</b>',
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
            'body': 'Emails are <b>boring!</b>',
            'sender': 'Billy Advisor <advisor@email.com>',
            'recipients': [
              'Johnny Analyst <analyst@email.com>'
            ],
            'cc': [
              'cc@email.com'
            ],
            'sent_at': '2015-06-02T11:30:00.000+00:00',
            'outgoing': false
          },

        ],
        'meta': {
          'page': 1,
          'per_page': 2,
          'total_count': 4,
          'total_pages': 2
        }
      });
    } else {
      res.send({
        'emails': [
          {
            'id': 3,
            'subject': 'This is an EMAILLL subject',
            'body': 'Emails are <b>fun!</b>',
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
            'id': 4,
            'subject': 'This is ANOTHER email subject',
            'body': 'Emails are <b>boring!</b>',
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
          'page': 2,
          'per_page': 2,
          'total_count': 4,
          'total_pages': 2
        }
      });
    }
  });

  app.use('/api/v1/emails', emailsRouter);
};
