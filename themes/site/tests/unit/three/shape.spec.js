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
            data() {
                return {
                    geometry: roundedRectangle(10, 10, 2)
                };
            },
            template: `<v-shape ref="shape" :geometry="geometry" />`,
        });
        
        const { innerMaterial, innerMesh, obj, outerMaterial, outerMesh } = vm.$refs.shape.$options.three;

        expect(innerMaterial.type).toBe('MeshLambertMaterial');
        expect(innerMesh.type).toBe('Mesh');
        expect(obj.type).toBe('Group');
        expect(outerMaterial.type).toBe('MeshLambertMaterial');
        expect(outerMesh.type).toBe('Mesh');
    });

    it('disposes of materials when destroyed', async () => {
        const vm = mount({
            data() {
                return {
                    geometry: roundedRectangle(1, 1, 0),
                    shape: true,
                };
            },
            template: `<v-shape v-if="shape" ref="shape" :geometry="geometry" />`,
        });

        const { innerMaterial, outerMaterial } = vm.$refs.shape.$options.three;

        const innerMaterialDispose = jest.spyOn(innerMaterial, 'dispose');
        const outerMaterialDispose = jest.spyOn(outerMaterial, 'dispose');

        vm.shape = false;
        await vm.$nextTick();

        expect(innerMaterialDispose).toHaveBeenCalled();
        expect(outerMaterialDispose).toHaveBeenCalled();
    });

    it('updates color when changed', async () => {
        const vm = mount({
            data() {
                return {
                    color: 0xff0000,
                    geometry: roundedRectangle(10, 10, 2)
                };
            },
            template: `<v-shape ref="shape" :color="color" :geometry="geometry" />`,
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
                    geometry: roundedRectangle(10, 10, 2),
                    innerOpacity: 0.5,
                };
            },
            template: `<v-shape ref="shape" :geometry="geometry" :inner-opacity="innerOpacity" />`,
        });

        const { innerMaterial } = vm.$refs.shape.$options.three;

        expect(innerMaterial.opacity).toBe(0.5);

        vm.innerOpacity = 0.75;
        await vm.$nextTick();

        expect(innerMaterial.opacity).toBe(0.75);
    });

    it('updates geometry when changed', async () => {
        const vm = mount({
            data() {
                return {
                    geometry: roundedRectangle(1, 1, 0),
                };
            },
            template: `<v-shape ref="shape" :geometry="geometry" />`,
        });

        // spy on necessary dispose functions
        const { innerMesh, outerMesh } = vm.$refs.shape.$options.three;

        // set our geometry to a larger square
        const newGeometry = roundedRectangle(2, 2, 0);
        vm.geometry = newGeometry;
        await vm.$nextTick();

        // and the new geometries should be applied to the meshes
        expect(innerMesh.geometry).toBe(newGeometry);
        expect(outerMesh.geometry).toBe(newGeometry);
    });

    it('accepts a hexadecimal triplet string as color', async () => {
        const vm = mount({
            data() {
                return {
                    color: '#ff0000',
                    geometry: roundedRectangle(10, 10, 2),
                };
            },
            template: `<v-shape ref="shape" :color="color" :geometry="geometry" />`,
        });

        const { innerMaterial, outerMaterial } = vm.$refs.shape.$options.three;


        expect(innerMaterial.color.getHexString()).toEqual('ff0000');
        expect(outerMaterial.color.getHexString()).toEqual('ff0000');

        vm.color = '#00ff00';
        await vm.$nextTick();

        expect(innerMaterial.color.getHexString()).toEqual('00ff00');
        expect(outerMaterial.color.getHexString()).toEqual('00ff00');

        vm.color = '0000ff';
        await vm.$nextTick();

        expect(innerMaterial.color.getHexString()).toEqual('0000ff');
        expect(outerMaterial.color.getHexString()).toEqual('0000ff');
    });
});
