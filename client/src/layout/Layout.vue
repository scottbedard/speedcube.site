<template>
  <header class="flex h-20 items-center justify-between tw-margin">
    <div class="flex gap-6 items-center">
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

      <nav class="hidden md:block">
        <DesktopNav />
      </nav>
    </div>

    <div class="hidden md:block">
      <DesktopUser />
    </div>

    <!-- <nav class="flex items-center gap-8">

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
    </nav> -->
  </header>

  <div class="flex-1 tw-margin">
    <RouterView />
  </div>
    
  <div class="py-4 tw-margin">
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components'
import { isAuthenticated } from '@/app/store/computed'
import { useDark, useToggle } from '@vueuse/core'
import DesktopNav from './DesktopNav.vue'
import DesktopUser from './DesktopUser.vue'
import Footer from './Footer.vue'

const iconSize = 6
const iconStroke = 1.8

export default defineComponent({
  setup() {
    const isDark = useDark()
    const toggleDarkMode = useToggle(isDark)

    return {
      iconSize,
      iconStroke,
      isAuthenticated,
      isDark,
      toggleDarkMode,
    }
  },
  components: {
    DesktopNav,
    DesktopUser,
    Footer,
    Icon,
  },
  name: 'Layout',
})
</script>
