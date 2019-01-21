import Vue from 'vue';

Vue.filter('locale', value => Number(value).toLocaleString());
