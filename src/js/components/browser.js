var utils = require('../utils');
var headbar = require('./headbar');
var browser = require('../application/browser');
var webview = require('../application/webviews');

module.exports = function(name, options, toolbar){
    var result = {};
    var data = { status: false };
    var webviewCreater = webview.create(options.webviews || {});
    var mode = options.keepAlive ? 'v-show="status"' : 'v-if="status"';
    var camelizeReq = utils.camelize(name + '-req');
    var camelizeEnv = utils.camelize(name + '-env');

    toolbar.fix(options, data);

    /**
     *  browser template maker
     */
    result.template = '<div class="web-browser" ' + mode + ' :transition="\'fade\' | fixAnimation"><headbar v-ref:headbar></headbar><div class="web-views">' + webviewCreater.html + '</div></div>';

    /**
     *  browser component maker
     */
    result.components = options.components || {};
    result.components.headbar = options.headbar || headbar.component; // headbar component
    utils.$extend(result.components, webviewCreater.result);

    /**
     * extend props objects
     */
    result.props = [name + '-req', name + '-env'];

    /**
     * extend computed objects
     */
    result.computed = options.computed || {};
    var computeds = {
        req: {
            set: function(value){ this[camelizeReq] = value; },
            get: function(){ return this[camelizeReq]; }
        },
        env: {
            set: function(value){ this[camelizeEnv] = value; },
            get: function(){ return this[camelizeEnv]; }
        },
        $toolbar: function(){
            return this.$root.$toolbar;
        }
    }
    if ( options.keepAlive ){
        computeds.$headbar = function(){
            return this.$refs.headbar;
        }
    }
    utils.$extend(result.computed, computeds);

    /**
     * extend method objects
     */
    result.methods = options.methods || {};
    var methods = {
        $webview: webview.get,
        $run: browser.run,
        $use: browser.use,
        $active: browser.active,
        $render: browser.render,
        $route: browser.route,
        $redirect: browser.redirect
    }
    utils.$extend(result.methods, methods);

    /**
     * extend event objects
     */
    result.events = options.events || {};
    var events = {
        end: function(){
            this.$nextcb && this.$nextcb();
        },
        hideHeadbar: function(){
            this.$broadcast('hideHeadbar');
        },
        showHeadbar: function(height){
            this.$broadcast('showHeadbar', height);
        },
        initHeadbar: function(height){
            this.$broadcast('initHeadbar', height);
        }
    }
    utils.$extend(result.events, events);

    /**
     * extend watch objects
     */
    result.watch = options.watch || {};
    var watches = {
        "status": function(value){
            var app = this.$parent;
            if ( value ){
                app.$ActiveBrowser = this;
            }else{
                var webview = this.$ActiveWebview;
                if ( webview ){
                    webview.status = false;
                }
            }
        }
    }
    utils.$extend(result.watch, watches);

    /**
     *  extend data objects
     */
    utils.$extend(data, options.data || {});
    result.data = function(){ return data; }

    return result;
}
