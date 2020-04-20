<script>
import { AxesHelper } from 'three';
import { noop } from 'lodash-es';
import { useNesting } from 'vue-use-three';

export default {
    setup(props) {
        const axesHelper = new AxesHelper(props.size);

        useNesting(axesHelper);
    },
    props: {
        size: {
            default: 50,
            type: Number,
        },
    },
    render: noop,
};
</script>
