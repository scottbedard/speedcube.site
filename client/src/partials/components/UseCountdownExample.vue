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
      Time remaining: {{ timeRemaining }}
    </div>
  </div>
</template>

<script lang="ts">
import { alert } from '@/app/alerts'
import { Button } from '@/components'
import { defineComponent } from 'vue'
import { useCountdown } from '@/app/behaviors'

export default defineComponent({
  setup() {
    const { 
      pause,
      reset,
      resume,
      timeRemaining,
    } = useCountdown(3000, () => {
      alert({
        text: 'Countdown finished',
        type: 'success',
      });
    })

    return {
      pause,
      reset,
      resume,
      timeRemaining,
    }
  },
  components: {
    Button,
  },
  name: 'UseCountdownExample',
})
</script>
