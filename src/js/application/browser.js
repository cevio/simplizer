var utils = require('../utils');
var layer = require('./layer');

exports.get = function(name){
    return this.$refs[utils.camelize('browser-' + name)];
}

exports.run = function(url, next){
    this.$url = url;
    this.$nextcb = next;
    this.$next.run();
}

exports.use = function(){
    var result = filterArguments(arguments);
    if ( result ){
        var router = result.router;
        var fns = result.fns;
        for ( var i = 0 ; i < fns.length ; i++ ){
            pushWare(this, 'use', router, utils.$looser, fns[i]);
        }
    }
}
exports.active = function(){
    var result = filterArguments(arguments);
    if ( result ){
        var router = result.router;
        var fns = result.fns;
        for ( var i = 0 ; i < fns.length ; i++ ){
            pushWare(this, 'active', router, utils.$strict, fns[i]);
        }
    }
}

exports.render = function(name){
    var that = this;
    utils.nextTick(function(){
        var webview = that.$webview(name);
        webview.status = true;
    });
}

function pushWare(that, method, path, opts, fn){
    var Layer = new layer(method, path, opts, fn);
    that.$next.use(function(next){
        if ( Layer.match(this.$url) ){
            var done = next;
            if ( Layer.method === 'active' ) {
                done = null;
                this.status = true;
            }
            Layer.params = Layer.params || {};
            for ( var i in Layer.params ){
                if ( this.req.params[i] == undefined ){
                    this.$set('req.params.' + i, Layer.params[i]);
                }else{
                    this.req.params[i] = Layer.params[i];
                }
            }
            return Layer.handle.call(this, done);
        }
        next();
    });
}

function filterArguments(_args){
    var args = utils.slice.call(_args), router, fns;
    if ( args.length ){
        router = args[0];
        if ( typeof router === 'function' ){
            fns = args;
            router = '/';
        }else{
            fns = args.slice(1);
        }
        return {
            router: router,
            fns: fns
        }
    }
}
