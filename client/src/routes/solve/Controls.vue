<template>
  <div class="gap-x-10 gap-y-3 flex flex-wrap justify-center">
    <a
      v-for="(link, index) in toolbar"
      class="flex items-center justify-center w-full sm:w-auto"
      href="#"
      :key="index"
      @click.prevent="link.onClick">
      <Icon
        class="mr-2"
        :name="link.icon" />
      
      {{ link.text }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components'

type ToolbarItem = {
  icon: string
  onClick: () => void
  text: string
}

export default defineComponent({
  setup() {
    const toolbar: ToolbarItem[] = [
      {
        icon: 'plus',
        text: 'Add key binding',
        onClick: () => {
          console.log('key binding')
        }
      },
      {
        icon: 'command',
        text: 'Add keyspace',
        onClick: () => {
          console.log('keyspace')
        }
      },
      {
        icon: 'tool',
        text: 'Edit JSON',
        onClick: () => {
          console.log('json')
        }
      },
      {
        icon: 'refresh-ccw',
        text: 'Reset default',
        onClick: () => {
          console.log('reset default')
        }
      },
      {
        icon: 'trash',
        text: 'Clear all',
        onClick: () => {
          console.log('clear all')
        }
      },
    ]

    return {
      toolbar
    }
  },
  components: {
    Icon,
  },
})
</script>
