<template>
  <header class="flex h-20 items-center justify-between tw-margin">
    <div class="flex gap-12 items-center">
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

    <div class="md:hidden">
      <MobileNav />
    </div>

    <div class="hidden md:block">
      <DesktopUser />
    </div>
  </header>

  <div class="flex-1 mb-6 tw-margin">
    <RouterView />
  </div>
    
  <div class="py-4 tw-margin">
    <Footer />
  </div>

  <div class="bottom-0 fixed flex justify-end right-0 z-20">
    <Alerts />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components'
import { isAuthenticated } from '@/app/store/computed'
import Alerts from './Alerts.vue'
import DesktopNav from './DesktopNav.vue'
import DesktopUser from './DesktopUser.vue'
import Footer from './Footer.vue'
import MobileNav from './MobileNav.vue'

export default defineComponent({
  setup() {
    return {
      isAuthenticated,
    }
  },
  components: {
    Alerts,
    DesktopNav,
    DesktopUser,
    Footer,
    Icon,
    MobileNav,
  },
  name: 'Layout',
})
</script>
