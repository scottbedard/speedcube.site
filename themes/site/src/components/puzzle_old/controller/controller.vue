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
            const reserved = [' ', 'Escape'];
            const turn = this.config.turns[e.key];

            if (!reserved.includes(e.key) && turn) {
                this.$emit('keypress', e);
                this.$emit('turn', turn);
            }
        },
        onBodyKeyup(e) {
            if (e.key === 'Escape') {
                this.$emit('escape', e);
            } else if (e.key === ' ') {
                this.$emit('space', e);
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
    },
};
</script>
