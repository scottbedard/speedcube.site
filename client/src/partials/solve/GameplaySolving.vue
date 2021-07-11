<template>
  <div class="gap-6 grid w-full">
    <div class="text-center text-4xl w-full">
      <div v-if="status === 'dnf'">
        DNF
      </div>

      <div
        v-else
        v-text="timerText"
        class="font-mono" />
    </div>

    <div class="gap-8 grid max-w-2xl mx-auto w-full sm:grid-cols-2">
      <div>
        <h3  class="mb-1 font-bold text-lg">Solve stats</h3>

        <Card padded>
          <div class="gap-4 grid">
            <div>
              <div>Total turns</div>
              <div>24 <span class="text-sm">(average 31)</span></div>
            </div>

            <div>
              <div>Average speed</div>
              <div>6.2 <span class="text-sm">turns per sec</span></div>
            </div>

            <div>
              <div>Idle time</div>
              <div>4.8 <span class="text-sm">seconds</span></div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3  class="mb-1 font-bold text-lg">Recent solves</h3>

        <Card padded>
          Hello
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Card } from '@/components'
import { computed, defineComponent, PropType } from 'vue'
import { formatTime } from '@/app/utils'
import { SolvingStatus } from '@/app/behaviors/use-solving'

export default defineComponent({
  setup(props) {
    const timerText = computed(() => {
      return props.status === 'inspection'
        ? Math.ceil(props.inspectionTime / 1000)
        : formatTime(props.solveTime)
    })

    return {
      timerText,
    }
  },
  components: {
    Card,
  },
  name: 'GameplaySolving',
  props: {
    inspectionTime: {
      required: true,
      type: Number,
    },
    solveTime: {
      required: true,
      type: Number,
    },
    status: {
      required: true,
      type: String as PropType<SolvingStatus>,
    },
  },
})
</script>
