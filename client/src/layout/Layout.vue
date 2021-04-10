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
import DesktopNav from './DesktopNav.vue'
import DesktopUser from './DesktopUser.vue'
import Footer from './Footer.vue'

const iconSize = 6
const iconStroke = 1.8

export default defineComponent({
  setup() {
    return {
      iconSize,
      iconStroke,
      isAuthenticated,
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
