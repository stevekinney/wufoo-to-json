var request = require('request');

function get(subdomain, apiKey, id, type, callback) {

  var url = 'https://' + subdomain + '.wufoo.com/api/v3/forms/'
            + id + '/' + type + '.json';

  var options = {
    auth: {
      user: apiKey,
      pass: 'footastic',
      sendImmediately: false
    }
  };

  request(url, options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(error, body);
    }
  });
}

exports.entries = function (subdomain, apiKey, id, callback) {
  get(subdomain, apiKey, id, 'entries', callback);
}

exports.fields = function (subdomain, apiKey, id, callback) {
  get(subdomain, apiKey, id, 'fields', callback);
}
