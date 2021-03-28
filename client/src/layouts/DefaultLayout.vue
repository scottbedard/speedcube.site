<template>
  <header class="flex h-16 items-center justify-between tw-margin">
    <RouterLink
      class="flex font-bold items-center text-2xl"
      :to="{ name: 'home' }">
      <Icon
        class="mr-2"
        name="box"
        :size="7"
        :stroke="2" />
      speedcube.site
    </RouterLink>

    <nav>
      <a
        href="#"
        :title="`Click to toggle ${isDark ? 'light' : 'dark'} mode`"
        @click.prevent="toggleDarkMode">
        <Icon
          :name="isDark ? 'moon' : 'sun'"
          :size="6"
          :stroke="2" />
      </a>
    </nav>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  setup() {
    const isDark = useDark()
    const toggleDarkMode = useToggle(isDark)

    return {
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
