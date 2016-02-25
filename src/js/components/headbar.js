var utils = require('../utils');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar">' +
            '<div class="web-headbar-left" @click="left.fn">' +
                '<div class="icon-content" v-html="left.icon"></div>' +
                '<div class="text-content" v-html="left.text"></div>' +
            '</div>' +
            '<div class="web-headbar-center" @click="center.fn" v-html="center.text"></div>' +
            '<div class="web-headbar-right" @click="right.fn">' +
                '<div class="icon-content" v-html="right.icon"></div>' +
                '<div class="text-content" v-html="right.text"></div>' +
            '</div>' +
        '</div>',
    data: function(){
        return {
            left: {
                icon: '',
                text: '',
                fn: utils.noop
            },
            right: {
                icon: '',
                text: '',
                fn: utils.noop
            },
            center: {
                text: '',
                fn: utils.noop
            }
        }
    },
    ready: function(){
        this.$parent.$headbar = this;
    }
}
