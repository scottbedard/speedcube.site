<template>
  <div class="flex gap-6 items-center">
    <RouterLink
      v-for="(link, index) in links"
      class="relative"
      :key="index"
      :to="link.to">
      {{ link.text }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LocationAsRelativeRaw, useRoute } from 'vue-router'

type Link = {
  text: string
  to: LocationAsRelativeRaw
}

export default defineComponent({
  setup() {
    const route = useRoute()
  
    const links: Link[] = [
      {
        text: 'Solve',
        to: {
          name: 'solve',
          params: {
            puzzle: '3x3',
          },
        },
      },
      {
        text: 'Records',
        to: {
          name: 'records',
          params: {
            puzzle: '3x3',
          },
        },
      },
    ]

    return {
      links,
      route,
    }
  },
  name: 'DesktopNav'
})
</script>