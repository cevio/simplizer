module.exports = {
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
}
