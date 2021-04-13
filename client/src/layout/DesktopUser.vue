<template>
  <div class="flex gap-6 items-center relative">
    <template v-if="isAuthenticated">
      <a
        class="flex items-center"
        href="#"
        @click.prevent="open">
        <div
          class="mr-6"
          v-text="user?.username" />

        <Icon
          class="mr-px"
          name="chevron-down"
          :size="4"
          :stroke="2" />

        <Icon
          name="user"
          :size="7"
          :stroke="1.75" />
      </a>

      <div
        v-if="expanded"
        class="absolute pt-2 right-0 top-full"
        ref="dropdown">
        <Card class="w-60">
          <CardLink
            icon="user"
            text="My Account"
            :to="{
              name: 'account:profile',
            }" />

          <CardLink
            icon="bar-chart-2"
            href="#"
            text="Stats" />

          <CardLink
            icon="log-out"
            text="Log out"
            :to="{ name: 'logout' }" />
        </Card>
      </div>
    </template>

    <template v-else>
      <RouterLink :to="{ name: 'login' }">
        Login
      </RouterLink>

      <RouterLink :to="{ name: 'create-account' }">
        Sign up
      </RouterLink>
    </template>
  </div>
</template>

<script lang="ts">
import { Card, CardLink, Icon } from '@/components'
import { defineComponent, ref, watch } from 'vue'
import { isAuthenticated } from '@/app/store/computed'
import { onClickOutside } from '@vueuse/core'
import { user } from '@/app/store/state'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const dropdown = ref<HTMLElement>()
    const expanded = ref(false)
    const route = useRoute()

    const close = () => {
      expanded.value = false
    }

    const open = () => {
      expanded.value = true
    }

    onClickOutside(dropdown, close)

    watch(route, close)

    return {
      dropdown,
      expanded,
      isAuthenticated,
      open,
      user,
    }
  },
  components: {
    Card,
    CardLink,
    Icon,
  },
  name: 'DesktopUser'
})
</script>