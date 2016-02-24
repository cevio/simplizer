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
    var indexBrowser = app.$browser('index');
    var aWebview = indexBrowser.$webview('a');
    var headbar = indexBrowser.$headbar;
    console.log(indexBrowser, aWebview, app, headbar)
});
