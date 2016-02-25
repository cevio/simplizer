var simplize = require('./main');

simplize.ready(function() {
    var app = simplize({
        "index": {
            title: "首页",
            icon: '<i class="fa fa-home"></i>',
            url: '/',
            keepAlive: true,
            webviews: {
                a: {

                    data: {
                        test: false
                    },
                    methods: {
                        click: function() {
                            window.location.href = "#/a/b/c/d";
                        }
                    },
                    components: {
                        as: {
                            name: 'as',
                            template: '<p>as component</p>'
                        }
                    },
                    events: {
                        // load: function(){
                        //     console.log('a is loaded')
                        // },
                        // unload: function(){
                        //     console.log('a is unloaded')
                        // }
                    }
                },
                b: {
                    events: {
                        load: function() {
                            console.log('b is loaded')
                        },
                        unload: function() {
                            console.log('b is unloaded')
                        }
                    }
                }
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

    app.$on('end', function() {
        console.log('pass');
    })

    var indexBrowser = app.$browser('index');
    var aWebview = indexBrowser.$webview('a');
    var headbar = indexBrowser.$headbar;
    // /a/b/c/d
    app.$use(indexBrowser);

    // /indexBrowser.$route('a');
    indexBrowser.$active(function() {
        this.$render('a', {
            before: function(){
                this.$headbar.center.text = 'simplize Home Page';
            }
        });
    });

    indexBrowser.$active('/a/b/c/d', function() {
            this.$render('b', {
                before: function(){
                    this.$headbar.center.text = 'simplize List Page';
                }
            })
        })
        //console.log(indexBrowser, aWebview, app, headbar);
    app.$run();
});
