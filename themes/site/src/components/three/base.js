import { degreesToRadians } from '@/app/utils/number';
import { findAncestor } from '@/app/utils/component';
import { get, intersection } from 'lodash-es';

export default {
    created() {
        this.$options.three = {
            obj: null,
        };

        this.$options.threeContext = {
            renderer: null,
            scene: null,
        };
    },
    data() {
        return {
            threeObjHover: false,
        };
    },
    destroyed() {
        this.removeFromParentObj();
    },
    mounted() {
        this.addToParentObj();
        this.setLocalPosition();
        this.setLocalRotation();
        this.setVisible();
        this.bindSceneEvents();
    },
    render() {
        return this.$slots.default;
    },
    methods: {
        addToParentObj() {
            // add to the parent object
            const { obj } = this.$options.three;
            const parentObj = this.findParentObj();

            if (obj && parentObj) {
                parentObj.add(obj);
            }
        },
        bindSceneEvents() {
            // bind mouse events with our scene if necessary
            const events = ['click', 'mouseenter', 'mouseleave', 'mousemove'];
            const listeners = Object.keys(this.$listeners);

            if (intersection(events, listeners).length > 0) {
                const scene = findAncestor(this, 'scene');

                if (scene) {
                    scene.bindMouseEvents(this);
                }
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
        setVisible() {
            const { obj } = this.$options.three;

            if (obj) {
                obj.visible = this.visible;
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
        visible: {
            default: true,
            type: Boolean,
        },
    },
    watch: {
        threeObjHover(hover, oldHover) {
            if (hover && !oldHover) {
                this.$emit('mouseenter');
            } else if (!hover && oldHover) {
                this.$emit('mouseleave');
            }
        },
        position: {
            deep: true,
            handler: 'setLocalPosition',
        },
        rotation: {
            deep: true,
            handler: 'setLocalRotation',
        },
        visible: {
            handler: 'setVisible',
        },
    },
};
