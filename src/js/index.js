var simplize = require('./main');
var database = require('./data');

simplize.ready(function() {
    simplize.viewport('retina');
    var app = simplize(database);

    app.$on('end', function() {
        console.log('pass');
    });

    var indexBrowser = app.$browser('index');
    var aWebview = indexBrowser.$webview('a');
    var headbar = indexBrowser.$headbar;
    // /a/b/c/d
    app.$use(simplize.localConnect());
    app.$use(indexBrowser);
    // /indexBrowser.$route('a');
    indexBrowser.$use(simplize.localConnect());
    indexBrowser.$use(simplize.cookieConnect());
    indexBrowser.$active(function() {
        this.$cookie.$add('evio', {a:1})
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
    });
    app.$run();
    console.log(app);
});
