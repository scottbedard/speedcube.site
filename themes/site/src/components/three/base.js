import { degreesToRadians } from '@/app/utils/number';

export default {
    created() {
        this.$options.three = {
            obj: null,
        };
    },
    destroyed() {
        this.removeFromParentObj();
    },
    mounted() {
        this.addToParentObj();
        this.setLocalPosition();
        this.setLocalRotation();
    },
    render() {
        return this.$slots.default;
    },
    methods: {
        addToParentObj() {
            const { obj } = this.$options.three;
            const parentObj = this.findParentObj();

            if (obj && parentObj) {
                parentObj.add(obj);
            }
        },
        findParentObj() {
            let parent = this.$parent;

            while (parent) {
                if (typeof parent.$options.three === 'object') {
                    return parent.$options.three.obj;
                }

                parent = parent.$parent;
            }

            return null;
        },
        removeFromParentObj() {
            const { obj } = this.$options.three;
            const parentObj = this.findParentObj();

            if (obj && parentObj) {
                parentObj.remove(obj);
            }
        },
        setLocalPosition() {
            const { obj } = this.$options.three;

            if (obj) {
                const { x, y, z } = {
                    x: 0,
                    y: 0,
                    z: 0,
                    ...this.position,
                };

                obj.position.set(x, y, z);
            }
        },
        setLocalRotation() {
            const { obj } = this.$options.three;

            if (obj) {
                const { x, y, z } = {
                    x: 0,
                    y: 0,
                    z: 0,
                    ...this.rotation,
                };

                obj.rotation.x = degreesToRadians(x);
                obj.rotation.y = degreesToRadians(y);
                obj.rotation.z = degreesToRadians(z);
            }
        },
    },
    props: {
        position: {
            default() {
                return { x: 0, y: 0, z: 0 };
            },
            type: Object,
        },
        rotation: {
            default() {
                return { x: 0, y: 0, z: 0 };
            },
            type: Object,
        },
    },
    watch: {
        position: {
            deep: true,
            handler: 'setLocalPosition',
        },
        rotation: {
            deep: true,
            handler: 'setLocalRotation',
        },
    },
};
