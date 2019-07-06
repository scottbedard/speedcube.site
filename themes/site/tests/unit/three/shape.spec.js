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
});
