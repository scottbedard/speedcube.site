<script>
import { noop } from 'lodash-es';

export default {
    created() {
        this.$root.$emit('scene-created', this);
    },
    destroyed() {
        this.$root.$emit('scene-destroyed', this);
    },
    render: noop,
};
</script>
