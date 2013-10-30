var request = require('request');
var _ = require('lodash');
var Objectify = require('objectify-arrays');

module.exports = pullData;

function pullData(id, subdomain, apiKey, callback) {
  var objectify = new Objectify();
  var results = [];

  objectify.on('data', function (data) {
    results.push(data);
  });
  objectify.on('end', function () {
    callback(null, results);
  });

  getFields(id, subdomain, apiKey, function (err, body) {
    objectify.setHeader(pluckFields(body));
    getEntries(id, subdomain, apiKey, function (err, body) {
      pluckEntries(body).forEach(function (el) {
        objectify.write(el);
      });
     objectify.end();
    })
  });
}

function get(type, subdomain, apiKey, id, callback) {
  var options = {
    auth: {
      user: apiKey,
      pass: 'footastic',
      sendImmediately: false
    }
  };
  var url = 'https://' + subdomain + '.wufoo.com/api/v3/forms/'
            + id + '/' + type + '.json';
  request(url, options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(error, body);
    }
  });
}

function getFields(id, subdomain, callback) {
  get('fields', id, subdomain, callback);
}

function getEntries(id, subdomain, callback) {
  get('entries', id, subdomain, callback);
}

