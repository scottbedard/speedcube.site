<template>
  <div>
    <div class="gap-6 flex mb-6">
      <Button @click="resume">
        Resume
      </Button>

      <Button @click="pause">
        Pause
      </Button>

      <Button @click="reset">
        Reset
      </Button>
    </div>

    <div>
      Time: <span class="font-mono">{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from '@/components'
import { defineComponent } from 'vue'
import { useTimer } from '@/app/behaviors'

export default defineComponent({
  setup() {
    const {
      pause,
      reset,
      resume,
      time,
    } = useTimer()

    return {
      pause,
      reset,
      resume,
      time,
    }
  },
  components: {
    Button,
  },
  name: 'UseTimerExample',
})
</script>