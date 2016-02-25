var utils = require('../utils');
var animationend = require('animationend');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar" v-if="status" :transition="statusAnimate">' +
            '<div class="web-head" :class="class" :style="style">' +
                '<div class="web-headbar-left" @click="left.fn">' +
                    '<div class="icon-content" v-html="left.icon" v-if="left.iconStatus" transition="fade350"></div>' +
                    '<div class="text-content" v-html="left.text" v-if="left.textStatus" transition="headAnim" :class="direction"></div>' +
                '</div>' +
                '<div class="web-headbar-center" @click="center.fn" v-html="center.text" v-if="center.textStatus" transition="headAnim" :class="direction"></div>' +
                '<div class="web-headbar-right" @click="right.fn">' +
                    '<div class="text-content" v-html="right.text" v-if="right.textStatus" transition="headAnim" :class="direction"></div>' +
                    '<div class="icon-content" v-html="right.icon" v-if="right.iconStatus" transition="fade350"></div>' +
                '</div>' +
            '</div>' +
            '<div class="web-head web-head-temp" :class="temp.class" :style="temp.style" v-if="temp.status">' +
                '<div class="web-headbar-left">' +
                    '<div class="icon-content" v-html="temp.left.icon" v-if="temp.left.iconStatus" transition="fade350"></div>' +
                    '<div class="text-content" v-html="temp.left.text" v-if="temp.left.textStatus" transition="headAnim" :class="direction">></div>' +
                '</div>' +
                '<div class="web-headbar-center" v-html="temp.center.text" v-if="temp.center.textStatus" transition="headAnim" :class="direction">></div>' +
                '<div class="web-headbar-right">' +
                    '<div class="text-content" v-html="temp.right.text" v-if="temp.right.textStatus" transition="headAnim" :class="direction">></div>' +
                    '<div class="icon-content" v-html="temp.right.icon" v-if="temp.right.iconStatus" transition="fade350"></div>' +
                '</div>' +
            '</div>' +
        '</div>',
    data: function(){
        return {
            left: {
                icon: '',
                text: '',
                fn: utils.noop,
                iconStatus: true,
                textStatus: true
            },
            right: {
                icon: '',
                text: '',
                fn: utils.noop,
                iconStatus: true,
                textStatus: true
            },
            center: {
                text: '',
                fn: utils.noop,
                textStatus: true
            },
            class: '',
            style: '',
            direction: '',
            status: true,
            statusAnimate: 'fade350',
            temp: {
                status: false,
                left: {
                    icon: '',
                    text: '',
                    iconStatus: false,
                    textStatus: false
                },
                center: {
                    text: '',
                    textStatus: false
                },
                right: {
                    icon: '',
                    text: '',
                    iconStatus: false,
                    textStatus: false
                },
                class: '',
                style: '',
            }
        }
    },
    methods: {
        listen: function(){
            var that = this;
            animationend(this.$el.nextSibling.querySelector('.web-head .web-headbar-center')).then(function(){

              console.log('end')
                this.direction = '';
                that.temp.status = false;
                this.left.iconStatus = true;
                this.left.textStatus = true;
                this.right.iconStatus = true;
                this.right.textStatus = true;
                this.center.textStatus = true;
                this.temp.left.iconStatus = false;
                this.temp.left.textStatus = false;
                this.temp.right.iconStatus = false;
                this.temp.right.textStatus = false;
                this.temp.center.textStatus = false;
            });
        }
    },
    events: {
        left: function(){
            this.direction = 'left';
            this.left.iconStatus = false;
            this.left.textStatus = false;
            this.right.iconStatus = false;
            this.right.textStatus = false;
            this.center.textStatus = false;

            this.temp.status = true;
            this.temp.left.iconStatus = true;
            this.temp.left.textStatus = true;
            this.temp.right.iconStatus = true;
            this.temp.right.textStatus = true;
            this.temp.center.textStatus = true;
        },
        right: function(){
            this.direction = 'right';
            this.left.iconStatus = false;
            this.left.textStatus = false;
            this.right.iconStatus = false;
            this.right.textStatus = false;
            this.center.textStatus = false;

            this.temp.status = true;
            this.temp.left.iconStatus = true;
            this.temp.left.textStatus = true;
            this.temp.right.iconStatus = true;
            this.temp.right.textStatus = true;
            this.temp.center.textStatus = true;
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
