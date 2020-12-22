<template>
  <div
    class="gap-6 grid p-6"
    @mouseenter="pauseTimeouts"
    @mouseleave="resumeTimeouts">
    <div
      v-for="alert in alerts"
      class="flex justify-end"
      :key="alert.id">
      <div
        class="flex gap-2 items-center p-3 rounded shadow"
        :class="[color(alert)]">
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { pauseTimeouts, resumeTimeouts } from '@/app/store/alert/actions';
import { Alert, AlertType, alerts } from '@/app/store/alert/state';
import { defineComponent } from 'vue';

const colors: Partial<Record<AlertType, string>> = {
  danger: 'bg-red-500',
  success: 'bg-green-600',
}

export default defineComponent({
  setup() {
    const color = (alert: Alert) => colors?.[alert.type] ?? 'bg-gray-700';

    return {
      alerts,
      color,
      pauseTimeouts,
      resumeTimeouts,
    };
  },
});
</script>
