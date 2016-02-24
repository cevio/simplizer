/**
 *  load modules.
 */
var Vue = require('vue');
var domReady = require('domready');

/**
 *  load deps.
 */
var utils = require('./utils');
var resource = require('./resource');
var appcations = require('./application');
var toolbar = require('./components/toolbar');
var webviews = require('./application/webviews');

/**
 *  expose proxy.
 */
module.exports = simplize;

function simplize(options){
    var components = fixConfigs(options);
    return new Vue({
        el: simplize.$root,
        data: resource,
        components: components
    });
}

simplize.ready = function(cb){
    domReady(function(){
        simplize.$root = createRoot();
        simplize.$html = utils.$query(document, 'html');
        cb();
    });
};


function createRoot(){
    var root = document.createElement('div');
    document.body.insertBefore(root, document.body.firstChild);
    utils.addClass(root, 'web-app');
    return root;
}

function fixConfigs(options){
    var result = {}, innerHTML = [];
    for ( var i in options ){
        var name = 'browser-' + i, data = {};
        innerHTML.push('<' + name + ' v-ref:' + name + '></' + name + '>');
        result[name] = options[i];
        toolbar.tbfix(result[name], data, webviews.wrapHTML);
        var webviewWraper = webviews.wrapWebviewHTML(name, result[name].webviews || {});
        result[name].template = '<div class="web-browser"><headbar></headbar><div class="web-views">' + webviewWraper.html + '</div></div>';
        result[name].components = webviewWraper.result;
        result[name].data = function(){
            return data;
        }
    }
    simplize.$root.innerHTML = '<div class="web-browsers">' + innerHTML.join('') + '</div><toolbar></toolbar>';
    return result;
}
