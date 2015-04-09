module.exports = function(app) {
  var express = require('express');
  var dialInsRouter = express.Router();

  dialInsRouter.get('/', function(req, res) {
    res.send({
      "dial-ins": {
        "AU": "Australia",
        "AT": "Austria",
        "BE": "Belgium",
        "DK": "Denmark",
        "FR": "France",
        "HK": "Hong Kong",
        "IL": "Israel",
        "IT": "Italy",
        "JP": "Japan",
        "NL": "Netherlands",
        "NZ": "New Zealand",
        "PL": "Poland",
        "PT": "Portugal",
        "ES": "Spain",
        "SE": "Sweden",
        "CH": "Switzerland",
        "UK": "United Kingdom",
        "US": "United States"
      }
    });
  });

  app.use('/swordfish/dial_ins', dialInsRouter);
};
