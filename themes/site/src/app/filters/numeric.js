export default function (Vue) {
    Vue.filter('locale', value => Number(value).toLocaleString());
}
