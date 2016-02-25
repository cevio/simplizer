var simplize = require('./main');

simplize.ready(function() {
    var app = simplize({
        "index": {
            title: "首页",
            icon: '<i class="fa fa-home"></i>',
            url: '/',
            webviews: {
                a: {
                    data: {
                        test: [],
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
    // indexBrowser.$active(function() {
    //     console.log(this);
    //     this.$render('a', function() {
    //         console.log(this);
    //         var that = this;
    //         setTimeout(function() {
    //             that.test = ['aaa','bbb','ccc','ddd','eee','fff'];
    //         }, 2000);
    //         setTimeout(function() {
    //             that.test = [];
    //         }, 4000);
    //
    //     });
    // });
    //indexBrowser.$route('a');
    indexBrowser.$active(function() {
        this.$render('a', {
            before: function(){
                this.$headbar.left.icon='';
                this.$headbar.left.text="";
                this.$headbar.center.text = 'Simplizer <br> <i class="fa fa-scribd"></i>';
                this.$headbar.right.icon='<i class="fa fa-css3"></i>';
                this.$headbar.right.text='MENU';
            }
        });
    });

    indexBrowser.$active('/a/b/c/d', function() {
            this.$render('b', {
                before: function(){
                    this.$headbar.center.text = 'simplize List Page';
                    this.$headbar.left.icon='<i class="fa fa-arrow-left"></i>';
                    this.$headbar.left.text="返回";
                    this.$headbar.center.text = 'Simplizer <br> <i class="fa fa-scribd"></i>';
                    this.$headbar.right.icon='';
                    this.$headbar.right.text='';
                }
            })
        })
        //console.log(indexBrowser, aWebview, app, headbar);
    app.$run();
});
