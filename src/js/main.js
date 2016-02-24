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
var toolbar = require('./components/toolbar');
var headbar = require('./components/headbar');
var browser = require('./application/browser');
var webviews = require('./application/webviews');

/**
 *  expose proxy.
 */
module.exports = simplize;

function simplize(options){
    var components = fixConfigs(options);
    components.toolbar = toolbar.component;
    return new Vue({
        el: simplize.$root,
        data: resource,
        components: components,
        methods: {
            browser: browser.get
        }
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
        innerHTML.push('<' + name + ' v-ref:' + name + ' :' + name + '-req.sync="req" :' + name + '-env.sync="env"></' + name + '>');
        result[name] = options[i];
        toolbar.tbfix(result[name], data, webviews.wrapHTML);
        var webviewWraper = webviews.wrapWebviewHTML(result[name].webviews || {});
        result[name].template = '<div class="web-browser"><headbar v-ref:headbar></headbar><div class="web-views">' + webviewWraper.html + '</div></div>';
        result[name].components = webviewWraper.result;
        result[name].components.headbar = result[name].headbar || headbar.component;

        /**
         * extend props objects
         */
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
        utils.$extend(computeds, options[i].computed || {});
        result[name].computed = computeds;

        var methods = {
            webview: webviews.get
        }
        utils.$extend(methods, options[i].methods || {});
        result[name].methods = methods;

        utils.$extend(data, options[i].data || {});
        result[name].data = function(){
            return data;
        }
    }
    simplize.$root.innerHTML = '<div class="web-browsers">' + innerHTML.join('') + '</div><toolbar v-ref:toolbar></toolbar>';
    return result;
}
