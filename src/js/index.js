var simplize = require('./main');

simplize.ready(function() {
    var app = simplize({
        "index": {
            title: "首页",
            icon: '<i class="fa fa-home"></i>',
            url: '/',
            webviews: {
                a: {
                    // left: {
                    //     icon: '←',
                    //     text: '左'
                    // },
                    data: {
                        test: ['aaa','bbb','ccc','ddd','eee','fff'],
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
        console.log(this);
        this.$render('a', function() {
            console.log(this);
            var that = this;
            setTimeout(function() {
                that.test = true;
            }, 2000);
            setTimeout(function() {
                that.test = false;
            }, 4000)
        });
    });
    //indexBrowser.$route('a');
    indexBrowser.$active(function() {
        //console.log('this')
        var that = this;
        this.$render('a', function() {
            console.log(this);
        });
    });
    indexBrowser.$active('/a/b/c/d', function() {
            this.$render('b', function() {
                //console.log(this);
            })
        })
        //console.log(indexBrowser, aWebview, app, headbar);
    app.$run();
});
