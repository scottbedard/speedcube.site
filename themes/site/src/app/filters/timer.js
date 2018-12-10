import Vue from 'vue';
import { formatTime, formatShortTime } from '@/app/utils/string';

Vue.filter('timer', formatTime);
Vue.filter('shortTimer', formatShortTime);