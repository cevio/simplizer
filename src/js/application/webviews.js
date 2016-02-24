var utils = require('../utils');
exports.wrapWebviewHTML = function(name, webviews){
    var result = {}, html = [];
    for ( var i in webviews ){
        var pname = name + '-webview-' + i;
        result[pname] = webviews[i];
        var template = utils.getTemplate(webviews[i].template);
        html.push('<' + pname + ' v-ref:' + pname + '></' + pname + '>');
        result[pname].template = '<div class="web-view">' + template + '</div>';
    }
    return {
        result: result,
        html: html.join('')
    }
}
