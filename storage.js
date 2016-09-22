_ = require('underscore');

var toObj = data => data.reduce(function(o, i) {
  o[i] = {checked: false, time: 0};
  return o;
}, {});

var status = toObj(_.range(8));

module.exports = status;
