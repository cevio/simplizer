var utils = require('../utils');
var animationend = require('animationend');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar" v-if="status" :transition="statusAnimate">' +
            '<div class="web-head" :class="class" :style="style">' +
                '<div class="web-headbar-left" @click="left.fn">' +
                    '<div class="icon-content" v-html="left.icon" v-if="open" transition="fade350"></div>' +
                    '<div class="text-content" v-html="left.text" v-if="open" :transition="transition" :class="direction"></div>' +
                '</div>' +
                '<div class="web-headbar-center" @click="center.fn" v-html="center.text" v-if="open" :transition="transition" :class="direction"></div>' +
                '<div class="web-headbar-right" @click="right.fn">' +
                    '<div class="text-content" v-html="right.text" v-if="open" :transition="transition" :class="direction"></div>' +
                    '<div class="icon-content" v-html="right.icon" v-if="open" transition="fade350"></div>' +
                '</div>' +
            '</div>' +
            '<div class="web-head web-head-temp" :class="temp.class" :style="temp.style" v-if="temp.status">' +
                '<div class="web-headbar-left">' +
                    '<div class="icon-content" v-html="temp.left.icon" v-if="temp.open" transition="fade350"></div>' +
                    '<div class="text-content" v-html="temp.left.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                '</div>' +
                '<div class="web-headbar-center" v-html="temp.center.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                '<div class="web-headbar-right">' +
                    '<div class="text-content" v-html="temp.right.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                    '<div class="icon-content" v-html="temp.right.icon" v-if="temp.open" transition="fade350"></div>' +
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
            direction: '',
            status: true,
            transition: 'headAnim',
            open: true,
            statusAnimate: 'fade350',
            temp: {
                status: false,
                left: {
                    icon: '',
                    text: ''
                },
                center: {
                    text: ''
                },
                right: {
                    icon: '',
                    text: ''
                },
                class: '',
                style: '',
                open: false
            }
        }
    },
    methods: {
        listen: function(){
            var that = this;
            animationend(this.$el.nextSibling.querySelector('.web-head .web-headbar-center')).then(function(){
                that.direction = '';
                that.transition = '';
                that.temp.status = false;
                that.open = true;
                that.temp.open = false;
            });
        }
    },
    events: {
        left: function(){
            this.direction = 'left';
            this.transition = 'headAnim';
            this.open = false;
            this.temp.status = true;
            this.temp.open = true;
        },
        right: function(){
            this.direction = 'right';
            this.transition = 'headAnim';
            this.open = false;
            this.temp.status = true;
            this.temp.open = true;
        },
        before: function(){
            this.temp.left.icon = this.left.icon;
            this.temp.left.text = this.left.text;
            this.temp.right.icon = this.right.icon;
            this.temp.right.text = this.right.text;
            this.temp.center.text = this.center.text;
            this.temp.class = this.class;
            this.temp.style = this.style;
        }
    },
    ready: function(){
        this.$parent.$headbar = this;
    }
}
