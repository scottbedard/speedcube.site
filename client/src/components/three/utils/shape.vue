<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';
import { Group, Material, Mesh, ShapeBufferGeometry } from 'three';
import { noop } from 'lodash-es';
import { useNesting } from '@/app/three/behaviors/nesting';
import { positionProp, usePosition } from '@/app/three/behaviors/position';

export default defineComponent({
  setup(props) {
    const group = new Group;

    watchEffect(() => {
      const mesh = new Mesh(props.geometry, props.material);

      group.remove(...group.children);
      group.add(mesh);
    });

    useNesting(group);
    usePosition(group, () => props.position);
  },
  props: {
    geometry: {
      required: true,
      type: Object as PropType<ShapeBufferGeometry>,
    },
    material: {
      required: true,
      type: Object as PropType<Material>,
    },
    position: positionProp,
  },
  render: noop,
});
</script>
