<script lang="ts">
import { AxesHelper } from 'three';
import { defineComponent } from 'vue';
import { noop } from 'lodash-es';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useNesting } from '@/app/three/behaviors/nesting';

export default defineComponent({
  setup(props) {
    const axesHelper = new AxesHelper(Number(props.size));

    useNesting(axesHelper);
    usePosition(axesHelper, () => props.position);
  },
  render: noop,
  props: {
    position: positionProp,
    size: {
      default: 1,
      type: [Number, String],
    },
  },
});
</script>