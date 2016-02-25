var animationend = require('animationend');
var utils = require('../utils');
var keep = require('./session');

module.exports = function(oldbrowser, newBrowser, oldwebview, webview, direction, foo){
    if ( !newBrowser ) return;
    var app = newBrowser.$parent;
    if ( !oldbrowser || oldbrowser != newBrowser ){
        webview.status = true;
        if ( !oldbrowser ){
            webview.$emit('load');
            typeof foo === 'function' && foo.call(webview);
        }
    }else{

        load(webview, foo);
        unload(oldwebview)
        oldwebview.status = false;
        webview.status = true;

        var $direction = app.$history;
        if ( direction != 'history' && direction && $direction != direction ){
            $direction = direction;
        }

        switch ($direction) {
            case 'left':
                oldwebview.direction = webview.direction = 'left';
                break;
            case 'right':
                oldwebview.direction = webview.direction = 'right';
                break;
            default:
                oldwebview.direction = webview.direction = 'fade';
        }
    }
}

function load(webview, foo){
    animationend(webview.$el).then(function(){
        if (typeof keep.temp === 'function'){
            keep.temp();
        }
        webview.$emit('load');
        typeof foo === 'function' && foo.call(webview);
    });
}
function unload(webview){
    animationend(webview.$el).then(function(){
        webview.$emit('unload');
    });
}
