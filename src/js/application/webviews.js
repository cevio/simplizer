var utils = require('../utils');
exports.wrapWebviewHTML = function(webviews){
    var result = {}, html = [];
    for ( var i in webviews ){
        var pname = 'webview-' + i, data = webviews[i].data || {};
        result[pname] = webviews[i];
        var template = utils.getTemplate(webviews[i].template || "template[name='" + i + "']");
        html.push('<' + pname + ' v-ref:' + pname + ' :' + pname + '-req.sync="req" :' + pname + '-env.sync="env"></' + pname + '>');
        result[pname].name = 'webview';
        result[pname].template = '<div class="web-view">' + template + '</div>';
        result[pname].props = [pname + '-req', pname + '-env'];
        var camelizeReq = utils.camelize(pname + '-req');
        var camelizeEnv = utils.camelize(pname + '-env');
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
        utils.$extend(computeds, webviews[i].computed || {});
        result[pname].computed = computeds;
        result[pname].data = function(){
            return data;
        }
    }
    return {
        result: result,
        html: html.join('')
    }
}

exports.get = function(name){
    return this.$refs[utils.camelize('webview-' + name)];
}
