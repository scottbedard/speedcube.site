<template>
  <div>
    <div class="mb-12 text-center">
      <Button
        v-if="status === 'idle'"
        primary
        @click="scramble">
        Scramble
      </Button>

      <Countdown
        v-if="status === 'inspecting'"
        class="text-4xl"
        :duration="15000"
        @complete="start" />
    </div>
  
    <div
      v-if="status === 'idle'"
      class="gap-x-12 gap-y-2 flex flex-wrap justify-center">
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
import { computed, defineComponent, PropType } from 'vue'
import { keyboardConfig } from '@/app/store/computed'
import { Status } from '@/routes/solve/Index.vue'
import { useKeybindings } from '@/app/behaviors'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute()

    const keybindings = computed(() => keyboardConfig.value(props.puzzle))

    const scramble = () => {
      emit('scramble')
    }

    const start = () => {
      emit('start')
    }

    useKeybindings(keybindings, keybinding => {
      if (!props.scrambling) {
        emit('turn', keybinding.turn)
      }
    })

    return {
      route,
      scramble,
      start,
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