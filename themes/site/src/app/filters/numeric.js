import Vue from 'vue';

Vue.filter('locale', value => Number(value).toLocaleString());
Vue.filter('groupDigits', val => groupDigits(Number(val)));
