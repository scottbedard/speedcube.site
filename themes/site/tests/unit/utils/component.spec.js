/* eslint-disable */
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

//
// specs
//
describe('component utils', () => {
    it('findAncestor', () => {
        const vm = mount({
            components: {
                'v-parent': {
                    name: 'parent',
                    render(h) {
                        return <div>{this.$slots.default}</div>;
                    },
                },
                'v-child': {
                    name: 'child',
                    render(h) {
                        return <div>{this.$slots.default}</div>;
                    },
                },
                'v-grandchild': {
                    render: noop,
                },
            },
            template: `
                <v-parent ref="parent">
                    <v-child ref="child">
                        <v-grandchild ref="grandchild" />
                    </v-child>
                </v-parent>
            `,
        });

        expect(findAncestor(vm.$refs.grandchild, 'parent')).toBe(vm.$refs.parent);
        expect(findAncestor(vm.$refs.grandchild, 'child')).toBe(vm.$refs.child);
        expect(findAncestor(vm.$refs.grandchild, 'foo')).toBe(undefined);
    });
});
