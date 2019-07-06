/* eslint-disable */
import shapeComponent from '@/components/three/shape/shape.vue';
import { roundedRectangle } from '@/components/three/geometries';

//
// factory
//
const mount = factory({
    components: {
        'v-shape': shapeComponent,
    },
});

//
// specs
//
describe('<v-shape>', () => {
    it('creates a shape group', () => {
        const vm = mount({
            computed: {
                roundedRectangle: () => roundedRectangle(10, 10, 2),
            },
            template: `<v-shape ref="shape" :geometry="roundedRectangle" />`,
        });
        
        const { innerMaterial, innerMesh, obj, outerMaterial, outerMesh } = vm.$refs.shape.$options.three;

        expect(innerMaterial.type).toBe('MeshLambertMaterial');
        expect(innerMesh.type).toBe('Mesh');
        expect(obj.type).toBe('Group');
        expect(outerMaterial.type).toBe('MeshLambertMaterial');
        expect(outerMesh.type).toBe('Mesh');
    });

    it('updates color when changed', async () => {
        const vm = mount({
            data() {
                return {
                    color: 0xff0000,
                };
            },
            computed: {
                roundedRectangle: () => roundedRectangle(10, 10, 2),
            },
            template: `
                <v-shape
                    ref="shape"
                    :color="color"
                    :geometry="roundedRectangle"
                />
            `,
        });

        const { innerMaterial, outerMaterial } = vm.$refs.shape.$options.three;

        expect(innerMaterial.color).toEqual({ r: 1, g: 0, b: 0 });
        expect(outerMaterial.color).toEqual({ r: 1, g: 0, b: 0 });

        vm.color = 0x00ff00;
        await vm.$nextTick();

        expect(innerMaterial.color).toEqual({ r: 0, g: 1, b: 0 });
        expect(outerMaterial.color).toEqual({ r: 0, g: 1, b: 0 });
    });

    it('updates inner opacity when changed', async () => {
        const vm = mount({
            data() {
                return {
                    innerOpacity: 0.5,
                };
            },
            computed: {
                roundedRectangle: () => roundedRectangle(10, 10, 2),
            },
            template: `
                <v-shape
                    ref="shape"
                    :color="0x00ff00"
                    :inner-opacity="innerOpacity"
                    :geometry="roundedRectangle"
                />
            `,
        });

        const { innerMaterial } = vm.$refs.shape.$options.three;

        expect(innerMaterial.opacity).toBe(0.5);

        vm.innerOpacity = 0.75;
        await vm.$nextTick();

        expect(innerMaterial.opacity).toBe(0.75);
    });
});
