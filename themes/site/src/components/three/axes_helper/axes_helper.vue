<script>
import { AxesHelper } from 'three';
import { noop } from 'lodash-es';
import { useThree } from '@/app/behaviors/three';

export default {
    setup(props, context) {
        const axesHelper = new AxesHelper(props.size);

        useThree(axesHelper, { context });
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
