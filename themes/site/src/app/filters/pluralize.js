import pluralize from 'pluralize';

export default function (Vue) {
    Vue.filter('pluralize', pluralize);
}
