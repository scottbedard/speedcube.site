<script>
import { noop, stubObject } from 'lodash-es';
import { PointLight } from 'three';
import { useNesting, usePosition } from 'vue-use-three';
import { watch } from '@vue/composition-api';
import { hexColorValue } from '@/app/utils/string';

export default {
    /**
     * Setup.
     *
     * @return {Object}
     */
    setup(props) {
        const light = new PointLight(hexColorValue(props.color), props.intensity);

        watch(() => props.color, (color) => {
            light.color.setHex(hexColorValue(color));
        });

        watch(() => props.intensity, (intensity) => {
            light.intensity = intensity;
        });

        usePosition(light, () => props.position);

        useNesting(light);
    },
    props: {
        color: {
            default: 0xffffff,
            type: [Number, String],
        },
        intensity: {
            type: Number,
        },
        position: {
            default: stubObject,
            type: Object,
        },
    },
    render: noop,
};
</script>
