<template>
  <div class="gap-6 grid md:grid-cols-12">
    <nav class="md:col-span-4 lg:col-span-3">
      <div class="mb-2 font-bold text-lg">Account</div>
      
      <Card>
        <CardLink
          icon="user"
          text="Profile"
          :highlight="route.name === 'account:profile'"
          :to="{ name: 'account:profile' }" />
        
        <CardLink
          icon="lock"
          text="Security"
          :highlight="route.name === 'account:security'"
          :to="{ name: 'account:security' }" />

        <CardLink
          icon="bell"
          text="Notifications"
          :highlight="route.name === 'account:notifications'"
          :to="{ name: 'account:notifications' }" />
      </Card>
    </nav>

    <main class="md:col-span-8 lg:col-span-9">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { Card, CardLink } from '@/components'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    return {
      route
    }
  },
  components: {
    Card,
    CardLink,
  },
  name: 'AccountIndex',
})
</script>