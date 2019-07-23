/* eslint-disable */
import shapeComponent from '@/components/three/shape/shape.vue';
import { roundedRectangle } from '@/components/three/geometries';
import { MeshBasicMaterial } from 'three';

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
    it('creates group of meshes from geometry and materials', () => {
        const geometry = roundedRectangle(10, 10, 2);
        const innerMaterial = new MeshBasicMaterial();
        const outerMaterial = new MeshBasicMaterial();

        const vm = mount({
            data() {
                return { geometry, innerMaterial, outerMaterial };
            },
            template: `
                <v-shape
                    ref="shape"
                    :geometry="geometry"
                    :inner-material="innerMaterial"
                    :outer-material="outerMaterial"
                />
            `,
        });
        
        const { innerMesh, obj, outerMesh } = vm.$refs.shape.$options.three;

        expect(obj.type).toBe('Group');
        expect(obj.children.length).toBe(2);
        expect(obj.children.includes(innerMesh)).toBe(true);
        expect(obj.children.includes(outerMesh)).toBe(true);

        expect(innerMesh.type).toBe('Mesh');
        expect(innerMesh.geometry).toBe(geometry);
        expect(innerMesh.material).toBe(innerMaterial);
        
        expect(outerMesh.type).toBe('Mesh');
        expect(outerMesh.geometry).toBe(geometry);
        expect(outerMesh.material).toBe(outerMaterial);
    });
});
