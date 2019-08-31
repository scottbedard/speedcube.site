<template>
    <span><slot :value="display">{{ Math.round(display) }}</slot></span>
</template>

<script>
import { componentTimeout } from 'spyfu-vue-utils';
import { ease } from '@/app/utils/function';
import { easeInOutQuart } from '@/app/constants';

// protected method to animate counting
function count(vm, to, from) {
    const diff = to - from;

    if (vm.$options.ease) {
        vm.$options.ease.cancel();
        vm.$options.ease = null;
    }

    vm.$options.ease = ease(vm.curve, (t) => {
        vm.display = from + (diff * t);
    }, vm.duration);
}

export default {
    data() {
        return {
            currentAnimation: null,
            display: this.appear ? 0 : this.value,
        };
    },
    mounted() {
        if (this.appear) {
            componentTimeout(this, () => count(this, this.value, 0), this.delay);
        }
    },
    destroyed() {
        this.cancel();
    },
    methods: {
        cancel() {
            if (this.currentAnimation) {
                this.$options.ease.cancel();
            }

            this.display = this.value;
        },
    },
    props: {
        appear: {
            default: false,
            type: Boolean,
        },
        curve: {
            default: () => easeInOutQuart,
            type: Array,
        },
        delay: {
            default: 0,
            type: Number,
        },
        duration: {
            default: 3000,
            type: Number,
        },
        value: {
            required: true,
            type: Number,
        },
    },
    watch: {
        value(to, from) {
            count(this, to, from);
        },
    },
};
</script>
