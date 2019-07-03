/* eslint-disable */
import base from '@/components/three/base';

import {
    Object3D,
} from 'three';

//
// factory
//
const mount = factory({
    components: {
        'v-obj': {
            created() {
                this.$options.three.obj = new Object3D();
            },
            mixins: [base],
        },
    },
});

describe('threejs', () => {
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
});
