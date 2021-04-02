<template>
  <header class="flex h-20 items-center justify-between mb-6 tw-margin">
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

    <nav class="flex items-center gap-8">
      <RouterLink :to="{ name: 'login' }">
        Login
      </RouterLink>

      <RouterLink :to="{ name: 'create-account' }">
        Sign Up
      </RouterLink>

      <div class="flex gap-4">
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
          href="https://discord.gg/V98D9r7J"
          title="Join our Discord channel">
          <Icon
            name="message-square"
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
      </div>
    </nav>
  </header>

  <div class="tw-margin">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@/components'

export default defineComponent({
  setup() {
    const iconSize = 6
    const iconStroke = 1.8
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
