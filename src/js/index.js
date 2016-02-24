var simplize = require('./main');

simplize.ready(function(){
    var app = simplize({
        "index": {
            title: "首页",
            icon: '<i class="fa fa-home"></i>',
            url: '/',
            webviews: {
                'a': {
                    components: {
                        as: {
                            name: 'as',
                            template: '<p>as component</p>'
                        }
                    }
                }
            }
        },
        "home": {
            title: '测试',
            icon: '<i class="fa fa-home"></i>',
            url: '/a',
            webviews: {
                b: {}
            }
        },
        "list": {
            title: '李彪爷',
            icon: '<i class="fa fa-home"></i>',
            url: '/c',
            webviews: {
                c: {}
            }
        }
    });

    app.$on('end', function(){
        console.log('pass');
    })

    var indexBrowser = app.$browser('index');
    var aWebview = indexBrowser.$webview('a');
    var headbar = indexBrowser.$headbar;
    // /a/b/c/d
    app.$use('/a/:d', indexBrowser);
    indexBrowser.$use(function(next){
        console.log('in', this);
        next();
    });
    indexBrowser.$active('/c/:path', function(){
        console.log('this')
        this.$render('a');
    })
    console.log(indexBrowser, aWebview, app, headbar);
    app.$run();
});
