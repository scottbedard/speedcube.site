<script lang="ts">
// import { usePosition } from '@/app/three/utils/position';
import { AxesHelper } from 'three';
import { defineComponent, PropType } from 'vue';
import { noop, stubObject } from 'lodash-es';
import { useNesting } from '@/app/three/utils/nestable';
import { Vector } from '@/app/three/types';

export default defineComponent({
  setup() {
    const axesHelper = new AxesHelper;

    useNesting(axesHelper);
  },
  render: noop,
  props: {
    position: {
      default: stubObject,
      type: Object as PropType<Partial<Vector>>,
    },
  },
});
</script>