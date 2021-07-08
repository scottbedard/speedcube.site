<template>
  <div
    v-if="alerts.length > 0"
    class="gap-4 grid p-6">
    <div
      v-for="(alert, index) in alerts"
      class="flex items-center p-4 rounded-lg shadow-xl"
      :class="{
        'bg-gray-50 dark:bg-gray-700': true
      }"
      :key="index">
      <Icon
        class="mr-1"
        :class="{
          'text-red-500': alert.type === 'failed',
          'text-green-500': alert.type === 'success',
        }"
        :name="icon(alert.type)"
        :size="6"
        :stroke="2" />
      {{ alert.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Alert, useAlerts } from '@/app/alerts'
import { Icon } from '@/components'

export default defineComponent({
  setup() {
    const { alerts } = useAlerts()

    const icon = (type: Alert['type']) => {
      if (type === 'success') {
        return 'check'
      }

      if (type === 'failed') {
        return 'x'
      }

      return ''
    }

    return {
      alerts,
      icon
    }
  },
  components: {
    Icon,
  },
  name: 'Alerts',
})
</script>