<template>
  <div class="gap-12 grid w-full">
    <div class="text-center text-4xl w-full">
      <div v-if="status === 'dnf'">
        DNF
      </div>

      <div
        v-else
        v-text="timerText"
        class="font-mono" />

      <p
        v-if="status === 'complete' || status === 'dnf'"
        class="mt-2 text-center text-gray-500 text-sm dark:text-gray-300">
        Press escape to clear, spacebar to scramble
      </p>
    </div>

    <template v-if="status === 'complete' || status === 'dnf'">
      <!-- loading -->
      <div
        v-if="loading"
        class="flex justify-center text-gray-500 dark:text-gray-300">
        <Spinner />
      </div>

      <div 
        v-else-if="solve"
        class="gap-8 grid max-w-4xl mx-auto w-full sm:grid-cols-2">
        <!-- stats -->
        <div>
          <h3  class="mb-2 font-bold text-lg">Solve info</h3>

          <Card padded>
            <div class="gap-4 grid">
              <div class="flex flex-wrap justify-between">
                <div>Total turns</div>
                <div v-text="solve.turns" />
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Turns per second</div>
                <div v-text="tps" />
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Idle time</div>
                <div v-text="idleText" />
              </div>
            </div>
          </Card>
        </div>

        <!-- recent solves -->
        <div>
          <h3  class="mb-2 font-bold text-lg">Recent solves</h3>

          <Card padded>
            <div class="gap-4 grid">
              <div class="border-b border-gray-200 flex flex-wrap gap-x-6 pb-4 dark:border-gray-700">
                <a
                  v-for="n in 5"
                  v-text="dummyTime"
                  href="#"
                  :key="n" 
                  @click.prevent />
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Average of 5</div>
                <div v-text="dummyTime" />
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Average of 50</div>
                <div v-text="dummyTime" />
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Average of 100</div>
                <div v-text="dummyTime" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Card, Spinner } from '@/components'
import { computed, defineComponent, PropType } from 'vue'
import { formatTime, turnsPerSecond } from '@/app/utils'
import { Solve } from '@/app/types/models'
import { SolvingStatus } from '@/app/behaviors/use-solving'

export default defineComponent({
  setup(props) {
    const idleText = computed(() => formatTime(props.idleTime))

    const timerText = computed(() => {
      return props.status === 'inspection'
        ? Math.ceil(props.inspectionTime / 1000)
        : formatTime(props.solveTime)
    })

    const tps = computed(() => turnsPerSecond(props.solve?.turns, props.solve?.time))

    const dummyTime = formatTime(12345)

    return {
      dummyTime,
      idleText,
      timerText,
      tps,
    }
  },
  components: {
    Card,
    Spinner,
  },
  name: 'GameplaySolving',
  props: {
    idleTime: {
      required: true,
      type: Number,
    },
    inspectionTime: {
      required: true,
      type: Number,
    },
    loading: {
      required: true,
      type: Boolean,
    },
    solve: {
      type: Object as PropType<Solve | null>,
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
