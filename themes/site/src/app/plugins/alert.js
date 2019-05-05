//
// alert
//
function alert(message, options = {}) {
    this.$store.dispatch('alerts/add', { message, options });
}

//
// install
//
export default function(Vue) {
    Vue.use({
        install() {
            Vue.prototype.$alert = alert;
        },
    });
}