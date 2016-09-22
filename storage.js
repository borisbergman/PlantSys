_ = require('underscore');

var toObj = data => data.reduce(function(o, i) {
  o['input' + i] = false;
  return o;
}, {});

var status = toObj(_.range(8));

module.exports = status;
