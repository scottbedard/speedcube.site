<script>
import { bindExternalEvent } from 'spyfu-vue-utils';
import { noop } from 'lodash-es';

export default {
    created() {
        bindExternalEvent(this, document.body, 'keypress', this.onBodyKeypress);
        bindExternalEvent(this, document.body, 'keyup', this.onBodyKeyup);
    },
    methods: {
        onBodyKeypress(e) {
            if (this.turnable) {
                if (e.key === ' ') {
                    this.$emit('space');
                }
            }
        },
        onBodyKeyup(e) {
            if (this.turnable) {
                if (e.key === 'Escape') {
                    this.$emit('escape');
                }
            }
        }
    },
    render: noop,
    props: {
        turnable: {
            default: false,
            type: Boolean,
        },
    },
};
</script>
