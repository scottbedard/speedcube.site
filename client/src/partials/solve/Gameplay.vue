<template>
  <div>
    <div class="mb-12 text-center">
      <Button primary>
        Scramble
      </Button>
    </div>
  
    <div class="gap-x-12 gap-y-2 flex flex-wrap justify-center">
      <RouterLink
        class="flex items-center"
        :to="{
          name: 'solve:config',
          params: {
            puzzle: route.params.puzzle,
          },
        }">
        <IconText name="sliders" svg-class="transform rotate-90">
          Customize Appearance
        </IconText>
      </RouterLink>

      <RouterLink
        class="flex items-center"
        :to="{
          name: 'solve:controls',
          params: {
            puzzle: route.params.puzzle,
          },
        }">
        <IconText name="hash">
          Edit Key Bindings
        </IconText>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Countdown, IconText } from '@/components'
import { defineComponent, PropType } from 'vue'
import { Status } from '@/routes/solve/Index.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    return {
      route,
    }
  },
  components: {
    Button,
    Countdown,
    IconText,
  },
  emits: [
    'scramble',
    'start',
    'turn',
  ],
  props: {
    puzzle: {
      required: true,
      type: String,
    },
    scrambling: {
      required: true,
      type: Boolean,
    },
    status: {
      required: true,
      type: String as PropType<Status>
    },
  },
})
</script>