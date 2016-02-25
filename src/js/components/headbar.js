var utils = require('../utils');
var animationend = require('animationend');
exports.component = {
    name: 'headbar',
    template:
        '<div class="web-headbar" v-if="status" :transition="transition3">' +
            '<div class="web-head" :class="class" :style="style" v-show="show">' +
                '<div class="web-headbar-left" @click="left.fn">' +
                    '<div class="icon-content" v-html="left.icon" v-if="open" :transition="transition2" :class="direction"></div>' +
                    '<div class="text-content" v-html="left.text" v-if="open" :transition="transition1" :class="direction"></div>' +
                '</div>' +
                '<div class="web-headbar-center" @click="center.fn">' +
                    '<div class="web-headbar-center-text" v-html="center.text" v-if="open" :transition="transition1" :class="direction"></div>' +
                '</div>' +
                '<div class="web-headbar-right" @click="right.fn">' +
                    '<div class="text-content" v-html="right.text" v-if="open" :transition="transition1" :class="direction"></div>' +
                    '<div class="icon-content" v-html="right.icon" v-if="open" :transition="transition2" :class="direction"></div>' +
                '</div>' +
            '</div>' +
            '<div class="web-head web-head-temp" :class="temp.class" :style="temp.style" v-if="temp.show" :transition="temp.transition">' +
                '<div class="web-headbar-left">' +
                    '<div class="icon-content" v-html="temp.left.icon" v-if="temp.open" :transition="transition2" :class="direction"></div>' +
                    '<div class="text-content" v-html="temp.left.text" v-if="temp.open" :transition="transition1" :class="direction">></div>' +
                '</div>' +
                '<div class="web-headbar-center" v-html="temp.center.text" v-if="temp.open" :transition="transition1" :class="direction">></div>' +
                '<div class="web-headbar-right">' +
                    '<div class="text-content" v-html="temp.right.text" v-if="temp.open" :transition="transition1" :class="direction">></div>' +
                    '<div class="icon-content" v-html="temp.right.icon" v-if="temp.open" :transition="transition2" :class="direction"></div>' +
                '</div>' +
            '</div>' +
        '</div>',
    data: function(){
        return {
            left: { icon: '', text: '', fn: utils.noop },
            right: { icon: '', text: '', fn: utils.noop },
            center: { text: '', fn: utils.noop },
            class: '',
            style: '',

            direction: '', // 动画方向
            status: true, // 是否显示headbar
            open: true, // 内部元素动画状态
            show: true, //动画容器状态
            transition1: 'headbarChild', // 内部元素的动画方式1
            transition2: 'headbarFaded', // 内部元素的动画方式2
            transition3: 'headbarFaded', // 显示headbar时候的动画
            temp: {
                open: false,
                show: false,
                transition: '',
                left: { icon: '', text: '' },
                center: { text: '' },
                right: { icon: '', text: '' },
                class: '',
                style: ''
            }
        }
    },
    methods: {
        listen: function(){
            var that = this;
            animationend(this.$el.nextSibling.querySelector('.web-head')).then(function(){
                that.temp.transition = '';
                utils.nextTick(function(){
                    that.show = true;
                    that.temp.show = false;
                    that.direction = '';
                    that.transition1 = '';
                    that.transition2 = '';
                    that.open = true;
                    that.temp.open = false;
                })
            });
        }
    },
    events: {
        left: function(){
            var that = this;

            this.show = true;
            this.temp.show = true;
            this.direction = 'left';
            this.transition1 = '';
            this.transition2 = '';
            this.temp.transition = 'headbarTemp';
            this.open = false;
            this.temp.open = true;


            utils.nextTick(function(){
                that.transition1 = 'headbarChild';
                that.transition2 = 'headbarFaded';
                that.open = true;
                that.temp.open = false;
            });
        },
        right: function(){
            var that = this;

            this.show = true;
            this.temp.show = true;
            this.direction = 'right';
            this.transition1 = '';
            this.transition2 = '';
            this.temp.transition = 'headbarTemp';
            this.open = false;
            this.temp.open = true;


            utils.nextTick(function(){
                that.transition1 = 'headbarChild';
                that.transition2 = 'headbarFaded';
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
