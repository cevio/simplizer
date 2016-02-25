var utils = require('../utils');
var animationend = require('animationend');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar" v-if="status" :transition="statusAnimate">' +
            '<div class="web-head" :class="class" :style="style" v-show="open">' +
                '<div class="web-headbar-left" @click="left.fn">' +
                    '<div class="icon-content" v-html="left.icon" v-if="open" :transition="slient" :class="direction"></div>' +
                    '<div class="text-content" v-html="left.text" v-if="open" :transition="transition" :class="direction"></div>' +
                '</div>' +
                '<div class="web-headbar-center" @click="center.fn" v-html="center.text" v-if="open" :transition="transition" :class="direction"></div>' +
                '<div class="web-headbar-right" @click="right.fn">' +
                    '<div class="text-content" v-html="right.text" v-if="open" :transition="transition" :class="direction"></div>' +
                    '<div class="icon-content" v-html="right.icon" v-if="open" :transition="slient" :class="direction"></div>' +
                '</div>' +
            '</div>' +
            '<div class="web-head web-head-temp" :class="temp.class" :style="temp.style" v-show="temp.open"  >' +
                '<div class="web-headbar-left">' +
                    '<div class="icon-content" v-html="temp.left.icon" v-if="temp.open" :transition="slient" :class="direction"></div>' +
                    '<div class="text-content" v-html="temp.left.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                '</div>' +
                '<div class="web-headbar-center" v-html="temp.center.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                '<div class="web-headbar-right">' +
                    '<div class="text-content" v-html="temp.right.text" v-if="temp.open" :transition="transition" :class="direction">></div>' +
                    '<div class="icon-content" v-html="temp.right.icon" v-if="temp.open" :transition="slient" :class="direction"></div>' +
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
            slient: 'fade350',
            open: true,
            statusAnimate: 'fade350',
            temp: {
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
            // animationend(this.$el.nextSibling.querySelector('.web-head')).then(function(){
            //     that.direction = '';
            //     that.transition = '';
            //     this.slient = '';
            //     that.open = true;
            //     that.temp.open = false;
            // });
        }
    },
    events: {
        left: function(){
            var that = this;
            this.direction = '';
            this.transition = '';
            this.slient = '';
            this.open = false;
            this.temp.open = true;

            utils.nextTick(function(){
              that.direction = 'left';
              that.transition = 'headAnim';
              that.slient = 'fade';
              that.open = true;
              that.temp.open = false;
            });
        },
        right: function(){
            var that = this;
            this.direction = '';
            this.transition = '';
            this.slient = '';
            this.open = false;
            this.temp.open = true;

            utils.nextTick(function(){
              that.direction = 'right';
              that.transition = 'headAnim';
              that.slient = 'fade';
              that.open = true;
              that.temp.open = false;
            });
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
