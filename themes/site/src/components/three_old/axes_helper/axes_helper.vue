AxesHelper

<script>
import { AxesHelper } from 'three';
import base from '../base';

export default {
    created() {
        this.$options.three.obj = new AxesHelper(this.size);
    },
    mixins: [
        base,
    ],
    props: {
        size: {
            default: 100,
            type: Number,
        },
    },
};
</script>
