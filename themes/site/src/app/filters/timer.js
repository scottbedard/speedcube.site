import { formatTime, formatShortTime } from '@/app/utils/string';

export default function (Vue) {
    Vue.filter('timer', formatTime);
    Vue.filter('shortTimer', formatShortTime);
}
