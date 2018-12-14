import Vue from 'vue';
import moment from 'moment';
import { timestampFormat } from '../constants';

Vue.filter('date', (value, format) => moment(value, timestampFormat).format(format));
Vue.filter('datestamp', value => moment(value, timestampFormat).format('MMMM Do, YYYY'));
