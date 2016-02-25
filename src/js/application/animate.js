var animationend = require('animationend');
var utils = require('../utils');
var keep = require('./session');

module.exports = function(oldbrowser, newBrowser, oldwebview, webview, direction, foo){
    if ( !newBrowser ) return;
    var before, after, canin = true, _in;

    if ( utils.$type(foo, 'object') ){
        before = foo.before;
        after = foo.after;
    }else if ( typeof foo === 'function' ){
        after = foo;
    }
    var app = newBrowser.$parent;
    var $headbar = newBrowser.$headbar;
    if ( oldbrowser && oldbrowser == newBrowser ){
        $headbar.$emit('before');
    }

    if ( typeof before === 'function' ){
        _in = before.call(webview);
        if ( _in === false ){
            canin = false;
        }
    }

    if ( !oldbrowser || oldbrowser != newBrowser ){
        if ( canin ){
            webview.status = true;
            if ( !oldbrowser ){
                webview.$emit('load');
                typeof after === 'function' && after.call(webview);
            }
        }
    }else{
        if ( canin ){
            var $direction = app.$history;
            $headbar && $headbar.listen();
            load($headbar, webview, after);
            unload(oldwebview)
            oldwebview.status = false;
            webview.status = true;

            if ( direction != 'history' && direction && $direction != direction ){
                $direction = direction;
            }

            switch ($direction) {
                case 'left':
                    oldwebview.direction = webview.direction = 'left';
                    $headbar.$emit('left');
                    break;
                case 'right':
                    oldwebview.direction = webview.direction = 'right';
                    $headbar.$emit('right');
                    break;
                default:
                    oldwebview.direction = webview.direction = 'fade';
                    $headbar.$emit('slient');
            }
        }
    }
}

function load($headbar, webview, after){
    animationend(webview.$el).then(function(){
        if (typeof keep.temp === 'function'){
            keep.temp();
        }
        webview.$emit('load');
        typeof after === 'function' && after.call(webview);
        $headbar && $headbar.$emit('end');
    });
}
function unload(webview){
    animationend(webview.$el).then(function(){
        webview.$emit('unload');
    });
}
