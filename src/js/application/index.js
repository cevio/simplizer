var utils = require('../utils');
var browser = require('./browser');

exports.env = {};
exports.create = browser(exports.constructor);
