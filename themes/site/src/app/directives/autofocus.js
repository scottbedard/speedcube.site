import Vue from 'vue';
import { isUndefined } from 'lodash-es';

Vue.directive('autofocus', {
    inserted(el, binding) {
        if (isUndefined(binding.expression) || binding.expression) {
            el.focus();
        }
    },
});
