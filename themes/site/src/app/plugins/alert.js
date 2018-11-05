import Vue from 'vue';

//
// alert
//
function alert(message, options = {}) {
    this.$store.dispatch('alerts/add', message, options);
}

//
// install
//
Vue.use({
    install() {
        Vue.prototype.$alert = alert;
    },
});
