var utils = require('../utils');
exports.wrapWebviewHTML = function(webviews){
    var result = {}, html = [];
    for ( var i in webviews ){
        var pname = 'webview-' + i, data = {
            status: false
        };

        (function(name, options, database){
            utils.extend(database, options.data || {});
            result[name] = options;
            var template = utils.getTemplate(options.template || "template[name='" + i + "']");
            html.push('<' + name + ' v-ref:' + name + ' :' + name + '-req.sync="req" :' + name + '-env.sync="env"></' + name + '>');
            result[name].name = 'webview';
            result[name].template = '<div class="web-view" v-show="status">' + template + '</div>';
            result[name].props = [name + '-req', name + '-env'];
            var camelizeReq = utils.camelize(name + '-req');
            var camelizeEnv = utils.camelize(name + '-env');
            var computeds = {
                req: {
                    set: function(value){ this[camelizeReq] = value; },
                    get: function(){ return this[camelizeReq]; }
                },
                env: {
                    set: function(value){ this[camelizeEnv] = value; },
                    get: function(){ return this[camelizeEnv]; }
                }
            }
            utils.$extend(computeds, options.computed || {});
            result[name].computed = computeds;
            result[name].data = function(){
                return database;
            }
        }).call(this, pname, webviews[i], data);
    }
    return {
        result: result,
        html: html.join('')
    }
}

exports.get = function(name){
    return this.$refs[utils.camelize('webview-' + name)];
}
