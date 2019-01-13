<script>
import { noop } from 'lodash-es';
import { bindExternalEvent } from '@/app/utils/component';

export default {
    created() {
        bindExternalEvent(this, document.body, 'keydown', this.onKeydown);
        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    methods: {
        onKeydown(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onKeyup(e) {
            if (e.key === 'Alt') {
                // ...
            } else if (e.key === 'Control' || e.key === 'Meta') {
                // ...
            } else if (e.key === 'Escape') {
                this.$emit('escape');
            } else if (e.key === 'Shift') {
                // ...
            } else if (e.key === ' ') {
                // ...
            } else {
                this.$emit('keyup', e);
            }
        },
    },
    render: noop,
};
</script>
