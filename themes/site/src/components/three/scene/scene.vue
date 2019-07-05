<script>
import { Scene } from 'three';
import base from '../base';

export default {
    created() {
        this.$options.three.obj = new Scene();
    },
    mounted() {
        this.$root.$emit('scene-add', this);
    },
    destroyed() {
        this.$root.$emit('scene-remove', this);
    },
    methods: {
        
    },
    mixins: [
        base,
    ],
    name: 'scene',
    props: {
        // ...
    },
};
</script>
