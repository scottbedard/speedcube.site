import shapeComponent from '@/components/three/shape/shape.vue';
import { roundedRectangle } from '@/components/three/geometries';
import { MeshBasicMaterial } from 'three';

//
// specs
//
describe('<v-shape>', () => {
    it('creates group of meshes from geometry and materials', () => {
        const geometry = roundedRectangle(10, 10, 2);
        const innerMaterial = new MeshBasicMaterial();
        const outerMaterial = new MeshBasicMaterial();

        const { vm } = mount({
            data() {
                return { geometry, innerMaterial, outerMaterial };
            },
            components: {
                'v-shape': shapeComponent,
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

    it('updates meshes when geometry changes', async () => {
        const geometry1 = roundedRectangle(1, 1, 1);
        const geometry2 = roundedRectangle(1, 1, 2);

        const { vm } = mount({
            data() {
                return {
                    geometry: geometry1,
                    innerMaterial: new MeshBasicMaterial(),
                    outerMaterial: new MeshBasicMaterial(),
                };
            },
            components: {
                'v-shape': shapeComponent,
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

        const { innerMesh, outerMesh } = vm.$refs.shape.$options.three;

        expect(innerMesh.geometry).toBe(geometry1);
        expect(outerMesh.geometry).toBe(geometry1);

        vm.geometry = geometry2;
        await vm.$nextTick();

        expect(innerMesh.geometry).toBe(geometry2);
        expect(outerMesh.geometry).toBe(geometry2);
    });

    it('updates inner mesh when inner material changes', async () => {
        const geometry = roundedRectangle(1, 1, 1);
        const material1 = new MeshBasicMaterial();
        const material2 = new MeshBasicMaterial();

        const { vm } = mount({
            data() {
                return {
                    geometry: geometry,
                    innerMaterial: material1,
                };
            },
            components: {
                'v-shape': shapeComponent,
            },
            template: `
                <v-shape
                    ref="shape"
                    :geometry="geometry"
                    :inner-material="innerMaterial"
                />
            `,
        });

        const { innerMesh } = vm.$refs.shape.$options.three;

        expect(innerMesh.material).toBe(material1);

        vm.innerMaterial = material2;
        await vm.$nextTick();

        expect(innerMesh.material).toBe(material2);
    });

    it('updates outer mesh when outer material changes', async () => {
        const geometry = roundedRectangle(1, 1, 1);
        const material1 = new MeshBasicMaterial();
        const material2 = new MeshBasicMaterial();

        const { vm } = mount({
            data() {
                return {
                    geometry: geometry,
                    outerMaterial: material1,
                };
            },
            components: {
                'v-shape': shapeComponent,
            },
            template: `
                <v-shape
                    ref="shape"
                    :geometry="geometry"
                    :outer-material="outerMaterial"
                />
            `,
        });

        const { outerMesh } = vm.$refs.shape.$options.three;

        expect(outerMesh.material).toBe(material1);

        vm.outerMaterial = material2;
        await vm.$nextTick();

        expect(outerMesh.material).toBe(material2);
    });
});
