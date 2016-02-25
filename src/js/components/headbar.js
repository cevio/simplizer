var utils = require('../utils');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar" v-if="status" :transition="statusAnimate">' +
            '<div class="web-head" :class="class" :style="style" v-show="open" :transition="animate">' +
                '<div class="web-headbar-left" @click="left.fn">' +
                    '<div class="icon-content" v-html="left.icon"></div>' +
                    '<div class="text-content" v-html="left.text"></div>' +
                '</div>' +
                '<div class="web-headbar-center" @click="center.fn" v-html="center.text"></div>' +
                '<div class="web-headbar-right" @click="right.fn">' +
                    '<div class="text-content" v-html="right.text"></div>' +
                    '<div class="icon-content" v-html="right.icon"></div>' +
                '</div>' +
            '</div>' +
            '<div class="web-head web-head-temp" :class="temp.class" :style="temp.style" v-if="temp.open" :transition="temp.animate">' +
                '<div class="web-headbar-left">' +
                    '<div class="icon-content" v-html="temp.left.icon"></div>' +
                    '<div class="text-content" v-html="temp.left.text"></div>' +
                '</div>' +
                '<div class="web-headbar-center" v-html="temp.center.text"></div>' +
                '<div class="web-headbar-right">' +
                    '<div class="text-content" v-html="temp.right.text"></div>' +
                    '<div class="icon-content" v-html="temp.right.icon"></div>' +
                '</div>' +
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
            },
            class: '',
            style: '',
            status: true,
            open: true,
            animate: 'fade',
            statusAnimate: 'fade',
            temp: {
                left: {
                    icon: '',
                    text: ''
                },
                center: '',
                right: {
                    icon: '',
                    text: ''
                },
                class: '',
                style: '',
                animate: 'fade',
                open: false
            }
        }
    },
    events: {
        left: function(){
            console.log('animateEnterFromLeftToCenter')
        },
        right: function(){
            console.log('animateEnterFromRightToCenter')
        },
        clone: function(){
            console.log('clone')
        }
    },
    ready: function(){
        this.$parent.$headbar = this;
    }
}
