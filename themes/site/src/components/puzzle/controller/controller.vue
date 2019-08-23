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
                } else {
                    const turn = this.config.turns[e.key];

                    if (turn) {
                        this.$emit('keypress', e);
                        this.$emit('turn', turn);
                    }
                }
            }
        },
        onBodyKeyup(e) {
            if (this.turnable) {
                if (e.key === 'Escape') {
                    this.$emit('escape');
                }
            }
        },
    },
    render: noop,
    props: {
        config: {
            default() {
                return { turns: {} };
            },
            type: Object,
        },
        turnable: {
            default: true,
            type: Boolean,
        },
    },
};
</script>
