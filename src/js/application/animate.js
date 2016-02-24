var animationend = require('animationend');
var utils = require('../utils');

module.exports = function(oldbrowser, newBrowser, oldwebview, webview, direction){
    if ( !newBrowser ) return;
    var app = newBrowser.$parent;
    if ( !oldbrowser || oldbrowser != newBrowser ){
        webview.status = true;
        if ( !oldbrowser ){
            webview.$emit('load');
        }
    }else{
        
        load(webview);
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

function load(webview){
    animationend(webview.$el).then(function(){
        webview.$emit('load');
    });
}
function unload(webview){
    animationend(webview.$el).then(function(){
        webview.$emit('unload');
    });
}
