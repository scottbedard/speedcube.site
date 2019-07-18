/* eslint-disable */
import objComponent from '@/components/three/obj/obj.vue';
import { degreesToRadians } from '@/app/utils/number';

//
// factory
//
const mount = factory({
    components: {
        'v-obj': objComponent,
    },
});

describe('<v-obj>', () => {
    it('adds and removes itself from parent objects', async () => {
        const vm = mount({
            data: () => ({ child: false }),
            template: `
                <v-obj ref="parent">
                    <v-obj v-if="child" ref="child" />
                </v-obj>
            `,
        });

        const { obj: parentObj } = vm.$refs.parent.$options.three;
        const add = jest.spyOn(vm.$refs.parent.$options.three.obj, 'add');
        const remove = jest.spyOn(vm.$refs.parent.$options.three.obj, 'remove');

        expect(add).not.toHaveBeenCalled();
        expect(remove).not.toHaveBeenCalled();

        vm.child = true;
        await vm.$nextTick();

        const { obj: childObj } = vm.$refs.child.$options.three;
        expect(add).toHaveBeenCalledWith(childObj);
        expect(remove).not.toHaveBeenCalled();
        add.mockReset();

        vm.child = false;
        await vm.$nextTick();

        expect(add).not.toHaveBeenCalled();
        expect(remove).toHaveBeenCalledWith(childObj);
    });

    it('sets local position and updates when changed', async () => {
        const vm = mount({
            data() {
                return {
                    x: 1,
                    y: 2,
                    z: 3,
                };
            },
            template: `
                <v-obj ref="obj" :position="{ x, y, z }" />
            `,
        });

        const { obj } = vm.$refs.obj.$options.three;

        expect(obj.position).toEqual({ x: 1, y: 2, z: 3 });
        
        vm.x = 10;
        vm.y = 20;
        vm.z = 30;
        await vm.$nextTick();
        
        expect(obj.position).toEqual({ x: 10, y: 20, z: 30 });
    });

    it('sets local rotation and updates when changed', async () => {
        const vm = mount({
            data() {
                return {
                    x: 1,
                    y: 2,
                    z: 3,
                };
            },
            template: `
                <v-obj ref="obj" :rotation="{ x, y, z }" />
            `,
        });

        const { obj } = vm.$refs.obj.$options.three;

        expect(obj.rotation.x).toBe(degreesToRadians(1));
        expect(obj.rotation.y).toBe(degreesToRadians(2));
        expect(obj.rotation.z).toBe(degreesToRadians(3));

        vm.x = 10;
        vm.y = 20;
        vm.z = 30;
        await vm.$nextTick();

        expect(obj.rotation.x).toBe(degreesToRadians(10));
        expect(obj.rotation.y).toBe(degreesToRadians(20));
        expect(obj.rotation.z).toBe(degreesToRadians(30));
    });

    it('sets initial visibility and updates when changed', async () => {
        const vm = mount({
            data() {
                return {
                    visible: false,
                };
            },
            template: `<v-obj ref="obj" :visible="visible" />`,
        });

        const { obj } = vm.$refs.obj.$options.three;

        expect(obj.visible).toBe(false);

        vm.visible = true;
        await vm.$nextTick();

        expect(obj.visible).toBe(true);
    });
});
