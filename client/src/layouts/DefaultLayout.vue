<template>
  <header class="flex h-16 items-center justify-between tw-margin">
    <RouterLink
      class="flex font-bold items-center text-xl"
      :to="{ name: 'home' }">
      <Icon
        class="mr-2"
        name="box"
        :size="7"
        :stroke="2" />
      speedcube.site
    </RouterLink>

    <nav class="flex items-center gap-6">
      <RouterLink :to="{ name: 'signup' }">
        Sign Up
      </RouterLink>

      <a
        href="#"
        :title="`Click to toggle ${isDark ? 'light' : 'dark'} mode`"
        @click.prevent="toggleDarkMode">
        <Icon
          :name="isDark ? 'moon' : 'sun'"
          :size="iconSize"
          :stroke="iconStroke" />
      </a>

      <a
        href="https://github.com/scottbedard/speedcube.site"
        target="_blank"
        title="Participate on GitHub">
        <Icon
          name="github"
          :size="iconSize"
          :stroke="iconStroke" />
      </a>
    </nav>
  </header>

  <div class="tw-margin">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  setup() {
    const iconSize = 6
    const iconStroke = 1.5
    const isDark = useDark()
    const toggleDarkMode = useToggle(isDark)

    return {
      iconSize,
      iconStroke,
      isDark,
      toggleDarkMode
    }
  },
  components: {
    Icon,
  },
  name: 'DefaultLayout',
})
</script>
