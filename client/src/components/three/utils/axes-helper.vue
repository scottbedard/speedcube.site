<script lang="ts">
import { AxesHelper } from 'three';
import { defineComponent } from 'vue';
import { noop } from 'lodash-es';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useNesting } from '@/app/three/behaviors/nesting';

export default defineComponent({
  setup(props) {
    const axesHelper = new AxesHelper(1);

    useNesting(axesHelper);
    usePosition(axesHelper, () => props.position);
  },
  render: noop,
  props: {
    position: positionProp,
  },
});
</script>