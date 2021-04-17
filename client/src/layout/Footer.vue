<template>
  <div class="flex items-center justify-between">
    <a
      href="#"
      :title="`Toggle ${isDark ? 'light' : 'dark'} mode`"
      @click.prevent="toggleDarkMode">
      <Icon
        :name="isDark ? 'moon' : 'sun'"
        :size="iconSize"
        :stroke="iconStroke" />
    </a>

    <div class="flex gap-4">
      <a
        href="https://github.com/scottbedard/speedcube.site"
        target="_blank"
        title="Contribute on GitHub">
        <Icon
          name="github"
          :size="iconSize"
          :stroke="iconStroke" />
      </a>

      <a
        href="https://twitter.com/speedcubesite"
        target="_blank"
        title="Follow us on Twitter">
        <Icon
          name="twitter"
          :size="iconSize"
          :stroke="iconStroke" />
      </a>

      <a
        href="https://discord.gg/V98D9r7J"
        title="Chat on Discord">
        <Icon
          name="message-square"
          :size="iconSize"
          :stroke="iconStroke" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components'
import { isDark } from '@/app/store/state'
import { useToggle } from '@vueuse/core'

const iconSize = 6
const iconStroke = 1.8

export default defineComponent({
  setup() {
    const toggleDarkMode = useToggle(isDark)

    return {
      iconSize,
      iconStroke,
      isDark,
      toggleDarkMode,
    }
  },
  components: {
    Icon,
  },
  name: 'Footer',
})
</script>