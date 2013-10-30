var request = require('request');
var _ = require('lodash');
var Objectify = require('objectify-arrays');

var format = require('./lib/format');
var get = require('./lib/get');

module.exports = pullData;

function pullData(subdomain, apiKey, id, callback) {
  var objectify = new Objectify();
  var results = [];

  objectify.on('data', function (data) {
    results.push(data);
  });
  objectify.on('end', function () {
    callback(null, results);
  });

  get.fields(subdomain, apiKey, id, function (err, body) {
    objectify.setHeader(format.fields(body));
    get.entries(subdomain, apiKey, id, function (err, body) {
      format.entries(body).forEach(function (el) {
        objectify.write(el);
      });
     objectify.end();
    })
  });
}
