var simplize = require('./main');

simplize.ready(function(){
    var application = simplize({
        "index": {
            name: "首页",
            icon: '<i class="fa fa-home"></i>',
            url: '/',
            webviews: {
                'a': {
                    template: "template[name='index']",
                    components: {
                        as: {
                            name: 'as',
                            template: '<p>as</p>'
                        }
                    }
                }
            }
        },
        "home": {
            name: '测试',
            icon: '<i class="fa fa-home"></i>',
            url: '/a',
            webviews: {
                b: {
                    template: "template[name='home']"
                }
            }
        },
        "list": {
            name: '李彪爷',
            icon: '<i class="fa fa-home"></i>',
            webviews: {
                c: {
                    template: "template[name='list']"
                }
            }
        }
    });
    console.log(application);
});
