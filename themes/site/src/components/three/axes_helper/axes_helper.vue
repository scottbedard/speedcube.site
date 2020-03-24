<script>
import { AxesHelper } from 'three';
import { noop } from 'lodash-es';
import { useThree } from '@/app/behaviors/three';

export default {
    setup(props, context) {
        const axesHelper = new AxesHelper(props.size);

        const { threeObj } = useThree(axesHelper, { context });

        return { threeObj };
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
