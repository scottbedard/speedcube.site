<template>
  <a
    class="block p-2 transform translate-x-2"
    href="#"
    @click.prevent="open">
    <Icon
      name="menu"
      size="6"
      stroke="2" />
  </a>

  <div
    v-if="expanded"
    class="bg-gray-50 bottom-0 fixed left-0 right-0 top-0 z-10 dark:bg-gray-800"
    ref="menu">
    <div class="flex h-20 items-center justify-between tw-margin">
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

      <a
        class="block p-2 transform translate-x-2"
        href="#"
        @click.prevent="close">
        <Icon
          name="x"
          size="6"
          stroke="2" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Icon } from '@/components'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const expanded = ref(false)
    const menu = ref<HTMLElement>()
    const route = useRoute()

    const close = () => {
      expanded.value = false
    }

    const open = () => {
      expanded.value = true
    }

    watch(route, close)

    return {
      close,
      expanded,
      menu,
      open,
    }
  },
  components: {
    Icon,
  },
  name: 'MobileNav',
})
</script>
