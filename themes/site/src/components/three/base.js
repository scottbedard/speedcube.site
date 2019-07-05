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

            obj.position.set(this.position.x, this.position.y, this.position.z);
        },
    },
    props: {
        position: {
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
    },
};
