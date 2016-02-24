/**
 *  load modules.
 */
var Vue = require('vue');
var domReady = require('domready');
var querystrings = require('querystrings');

/**
 *  load deps.
 */
var utils = require('./utils');
var resource = require('./resource');
var toolbar = require('./components/toolbar');
var headbar = require('./components/headbar');
var browser = require('./application/browser');
var webviews = require('./application/webviews');
var next = require('./next');
var layer = require('./application/layer');

/**
 *  expose proxy.
 */
module.exports = simplize;

Vue.component('middle', require('./components/middle'));
Vue.mixin({
    created: function(){
        this.$next = new next(function(){
            this.$emit('end');
        }, this);
    }
});

function simplize(options){
    simplize.init();
    var components = fixConfigs(options);
    components.toolbar = toolbar.component;
    return simplize.app = new Vue({
        el: simplize.$root,
        data: resource,
        components: components,
        methods: {
            $browser: browser.get,
            $use: simplize.use,
            $run: simplize.run
        },
        watch: {
            "req.href": simplize.run
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

simplize.init = function(){
    var location = window.location,
        search = location.search,
        hash = location.hash,
        href = location.href,
        result, query;

    if ( hash && hash != '#' ){
        result = utils.$rebuildURI(hash.substring(1));
    }else{
        result = utils.$rebuildURI('/');
    }

    if ( search && search != '?' ){
        search = search.substring(1);
        search = result.search + '&' + search;
        search = search.replace(/^\?/, '');
        result.search = search ? '?' + search : search;
        query = querystrings.format(search);
        result.query = query;
        result.href = result.path + result.search;
    }

    resource.req = result;

    var _href = location.origin + location.pathname + '#' + result.href;
    if ( _href != href ){
        history.replaceState({ url: _href }, document.title, _href);
    }
    simplize.hashChange();
}

simplize.run = function(){
    this.$next.run();
}

simplize.push = function(method, path, opts, fn){
    var Layer = new layer(method, path, opts, fn);
    var that = this;
    simplize.app.$next.use(function(next){
        if ( Layer.match(this.req.path) ){
            var distURL = this.req.path.replace(Layer.path, '') || '/';
            if ( !/^\//.test(distURL) ) distURL = '/' + distURL;
            this.req.params = Layer.params || {};
            return Layer.handle.call(this, distURL, next);
        }
        next();
    });
}

simplize.use = function(router, brw){
    if ( utils.$type(brw, 'string') ){
        brw = simplize.app.$browser(brw);
    }
    if ( !brw ){
        brw = router;
        router = '/';
    }
    simplize.push(
        'browser',
        router || '/',
        utils.$looser,
        brw.$run
    );
}

simplize.hashChange = function(){
    utils.on(window, 'hashchange', function(){
        var hash = window.location.hash.replace(/^\#/, '');
        utils.$extend(resource.req, utils.$rebuildURI(hash));
    });
}


function createRoot(){
    var root = document.createElement('div');
    document.body.insertBefore(root, document.body.firstChild);
    utils.addClass(root, 'web-app');
    return root;
}

function fixConfigs(options){
    var result = {}, innerHTML = [];
    for ( var i in options ){
        var name = 'browser-' + i, data = {
            status: false
        };
        innerHTML.push('<' + name + ' v-ref:' + name + ' :' + name + '-req.sync="req" :' + name + '-env.sync="env"></' + name + '>');

        (function(distoptions, database){

            result[name] = distoptions;
            toolbar.tbfix(result[name], database);

            var webviewWraper = webviews.wrapWebviewHTML(result[name].webviews || {});
            result[name].template = '<div class="web-browser" v-if="status"><headbar v-ref:headbar></headbar><div class="web-views">' + webviewWraper.html + '</div></div>';
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
                },
                $headbar: function(){
                    return this.$refs.headbar;
                }
            }
            utils.$extend(computeds, distoptions.computed || {});
            result[name].computed = computeds;

            /**
             * extend method objects
             */
            var methods = {
                $webview: webviews.get,
                $run: browser.run,
                $use: browser.use,
                $active: browser.active,
                $render: browser.render
            }
            utils.$extend(methods, distoptions.methods || {});
            result[name].methods = methods;

            /**
             * extend event objects
             */
            var events = {
                end: function(){
                    this.$nextcb && this.$nextcb();
                }
            }
            utils.$extend(events, distoptions.events || {});
            result[name].events = events;

            utils.$extend(database, distoptions.data || {});
            result[name].data = function(){ return database; }


        }).call(this, options[i], data);
    }
    simplize.$root.innerHTML = '<div class="web-browsers">' + innerHTML.join('') + '</div><toolbar v-ref:toolbar></toolbar>';
    return result;
}
