var utils = require('../utils');

exports.get = function(name){
    return this.$refs[utils.camelize('browser-' + name)];
}
