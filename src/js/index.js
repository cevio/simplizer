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
                this.$headbar.center.text = 'Simplize Demo Index';
                this.$headbar.right.icon='<i class="fa fa-sliders"></i>';
                this.$headbar.right.text='Set';
                this.$headbar.class = 'white';
            }
        });
    });

    indexBrowser.$active('/a/b/c/d', function() {
            this.$render('b', {
                before: function(){
                    this.$headbar.center.text = 'Simplize Blog Naps';
                    this.$headbar.left.icon='<i class="fa fa-angle-left"></i>';
                    this.$headbar.left.text="Back";
                    this.$headbar.left.fn=function(){
                      history.back();
                    }
                    this.$headbar.right.icon='';
                    this.$headbar.right.text='';
                    this.$headbar.class = 'white';
                }
            })
        })
        console.log(app);
    app.$run();
});
