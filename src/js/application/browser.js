var utils = require('../utils');
var next = require('../next');
var browser = module.exports = function(application){
    application.route = new next();
    return function(name){
        return new Browser(name);
    }
    // var args = utils.slice.call(arguments, 0);
    // if ( args.length ){
    //     var router = args[0], fns = args.slice(1);
    //     if ( typeof router === 'function' ){
    //         router = '/';
    //         fns = args;
    //     }
    //
    // }

}

function Browser(){
    this.route = new next(function(){
        
    }, this);
}
