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
        v-else 
        class="gap-8 grid max-w-4xl mx-auto w-full sm:grid-cols-2">
        <!-- stats -->
        <div>
          <h3  class="mb-2 font-bold text-lg">Solve info</h3>

          <Card padded>
            <div class="gap-4 grid">
              <div class="flex flex-wrap justify-between">
                <div>Total turns</div>
                <div>24</div>
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Turns per second</div>
                <div>4.2</div>
              </div>

              <div class="flex flex-wrap justify-between">
                <div>Idle time</div>
                <div v-text="dummyTime" />
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
import { formatTime } from '@/app/utils'
import { SolvingStatus } from '@/app/behaviors/use-solving'

export default defineComponent({
  setup(props) {
    const timerText = computed(() => {
      return props.status === 'inspection'
        ? Math.ceil(props.inspectionTime / 1000)
        : formatTime(props.solveTime)
    })

    const dummyTime = formatTime(12345)

    return {
      dummyTime,
      timerText,
    }
  },
  components: {
    Card,
    Spinner,
  },
  name: 'GameplaySolving',
  props: {
    inspectionTime: {
      required: true,
      type: Number,
    },
    loading: {
      required: true,
      type: Boolean,
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
