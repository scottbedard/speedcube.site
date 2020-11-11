<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { Group, Material, Mesh, ShapeBufferGeometry } from 'three';
import { noop } from 'lodash-es';
import { useHidden } from '@/app/three/behaviors/hidden';
import { useNesting } from '@/app/three/behaviors/nesting';
import { positionProp, usePosition } from '@/app/three/behaviors/position';

export default defineComponent({
  setup(props) {
    const group = new Group;

    watchEffect(() => {
      group.remove(...group.children);

      if (props.geometry) {
        if (props.innerMaterial) {
          group.add(new Mesh(props.geometry, props.innerMaterial));
        }

        if (props.outerMaterial) {
          group.add(new Mesh(props.geometry, props.outerMaterial));
        }
      }
    });

    useNesting(group);
    useHidden(group, () => props.hidden);
    usePosition(group, () => props.position);
  },
  props: {
    geometry: ShapeBufferGeometry,
    hidden: {
      default: false,
      type: Boolean,
    },
    innerMaterial: Material,
    outerMaterial: Material,
    position: positionProp,
  },
  render: noop,
});
</script>
