var utils = require('../utils');
var redirect = require('../application/redirect');
module.exports = function(name, options, item){
    var result = {}, html;
    var data = { status: false, direction: 'slient' };
    var camelizeReq = utils.camelize(name + '-req');
    var camelizeEnv = utils.camelize(name + '-env');
    var ignores = ['name', 'data', 'keepAlive', 'template', 'computed', 'watch', 'methods', 'events'];

    result.name= 'webviw';

    /**
     *  extend data objects
     */
    utils.$extend(data, options.data);
    result.data = function(){ return data; }

    /**
     *  extend template
     */
     if ( options.keepAlive == undefined ){
         options.keepAlive = true;
     }
     var template = utils.getTemplate(options.template || "template[name='" + item + "']");
     var mode = options.keepAlive ? 'v-show="status"' : 'v-if="status"';
     html = '<' + name + ' v-ref:' + name + ' :' + name + '-req.sync="req" :' + name + '-env.sync="env"></' + name + '>';
     result.template = '<div class="web-view" ' + mode + ' transition="move" :class="direction | fixAnimation">' + template + '</div>';

     /**
      *  extend props
      */
     result.props = [name + '-req', name + '-env'];

     /**
      *  extend computed objects
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
         $headbar: function(){
             return this.$parent.$headbar;
         },
         $toolbar: function(){
             return this.$root.$toolbar;
         }
     }
     utils.$extend(result.computed, computeds);

     /**
      *  extend watch objects
      */
     result.watch = options.watch || {};
     var watches = {
         "status": function(value){
             var browser = this.$parent;
             if ( value ){
                 browser.$ActiveWebview = this;
             }
         }
     }
     utils.$extend(result.watch, watches);

     /**
      *  extend method objects
      */
     result.methods = options.methods || {};
     var methods = {
         $redirect: redirect
     }
     utils.$extend(result.methods, methods);

     /**
      *  extend method objects
      */
     result.events = options.events || {};
     var events = {
         hideHeadbar: hideHeadbar,
         showHeadbar: showHeadbar,
         initHeadbar: initHeadbar
     }
     utils.$extend(result.events, events);

     for ( var opt in options ){
         if ( ignores.indexOf(opt) == -1 ){
             result[opt] = options[opt];
         }
     }

     return {
         component: result,
         html: html
     }
}

function hideHeadbar(){
    var that = this;
    var browser = this.$parent;
    utils.nextTick(function(){
        var current = browser.$ActiveWebview;
        if ( current == that ){
            browser.$headbar.$emit('hide', browser, that);
        }
    });
}

function showHeadbar(height){
    var that = this;
    var browser = this.$parent;
    utils.nextTick(function(){
        var current = browser.$ActiveWebview;
        if ( current == that ){
            browser.$headbar.$emit('show', browser, that, height);
        }
    });
}

function initHeadbar(height){
    this.$headbar.$emit('show', this.$parent, this, height);
}
