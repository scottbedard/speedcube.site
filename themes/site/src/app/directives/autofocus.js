import { isUndefined } from 'lodash-es';

export default function (Vue) {
    Vue.directive('autofocus', {
        inserted(el, binding) {
            if (isUndefined(binding.expression) || binding.expression) {
                el.focus();
            }
        },
    });
}
