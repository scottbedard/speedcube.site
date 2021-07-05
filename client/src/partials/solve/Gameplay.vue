<template>
  <div>
    <div class="mb-12 text-center">
      <Button primary @click="scramble">
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
import { Button, IconText } from '@/components'
import { computed, defineComponent } from 'vue'
import { keyboardConfig } from '@/app/store/computed'
import { useKeybindings } from '@/app/behaviors'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute()

    const keybindings = computed(() => keyboardConfig.value(props.puzzle))

    const scramble = () => {
      emit('scramble')
    }

    useKeybindings(keybindings, keybinding => {
      if (!props.scrambling) {
        emit('turn', keybinding.turn)
      }
    })

    return {
      route,
      scramble,
    }
  },
  components: {
    Button,
    IconText,
  },
  emits: [
    'scramble',
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
  },
})
</script>