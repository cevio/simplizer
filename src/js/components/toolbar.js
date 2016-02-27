exports.fix = function(result, data){
    result.name = 'browser';
    if ( result.title ) data.title = result.title;
    if ( result.icon ) data.icon = result.icon;
    if ( result.url ) data.url = result.url;
};

exports.fixdata = function(fn){
    this.tbfix = fn;
}

exports.component = {
    name: 'toolbar',
    template: '<div class="web-toolbar">toolbar</div>',
    ready: function(){
        this.$parent.$toolbar = this;
    }
}
