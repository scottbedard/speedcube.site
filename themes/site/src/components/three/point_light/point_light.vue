<script>
import { noop } from 'lodash-es';
import { PointLight } from 'three';
import { lightProps, threeProps, useLight, useThree } from '@/app/behaviors/three';

export default {

    /**
     * Setup.
     *
     * @return {Object}
     */
    setup(props, context) {
        const light = useLight(new PointLight(), {
            color: () => props.color,
            intensity: () => props.intensity,
        });

        const { getThreeObj } = useThree(light, {
            context,
            position: () => props.position,
        });

        return { getThreeObj };
    },
    props: {
        ...lightProps,
        ...threeProps,
    },
    render: noop,
};
</script>
