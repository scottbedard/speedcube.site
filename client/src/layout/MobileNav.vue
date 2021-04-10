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
    <div class="flex h-16 items-center justify-between mt-2 tw-margin">
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

    <nav class="tw-margin">
      <component
        v-bind="
          link.to
            ? { to: link.to }
            : { href: link.href }
        "
        v-for="(link, index) in links"
        class="flex items-center py-2"
        :key="index"
        :is="link.to ? 'RouterLink' : 'a'">
        <Icon
          :name="link.icon"
          class="mr-3"
          size="6"
          stroke="2" />
        {{ link.text }}
      </component>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue'
import { Icon } from '@/components'
import { isAuthenticated, isGuest } from '@/app/store/computed'
import { RouteLocationRaw, useRoute } from 'vue-router'

type Link = {
  condition?: Ref<boolean>
  href?: string
  icon: string
  text: string
  to?: RouteLocationRaw
}

export default defineComponent({
  setup() {
    const expanded = ref(false)
    const menu = ref<HTMLElement>()
    const route = useRoute()

    const links = computed<Link[]>(() => [
      {
        condition: isGuest,
        icon: 'arrow-right',
        text: 'Login',
        to: {
          name: 'login',
        },
      },
      {
        condition: isGuest,
        icon: 'user',
        text: 'Sign up',
        to: {
          name: 'create-account',
        },
      },
      {
        condition: isAuthenticated,
        href: '#',
        icon: 'user',
        text: 'My Account',
      },
      {
        condition: isAuthenticated,
        href: '#',
        icon: 'bar-chart-2',
        text: 'Stats',
      },
      {
        condition: isAuthenticated,
        icon: 'corner-down-right',
        text: 'Log out',
        to: {
          name: 'logout',
        },
      },
    ].filter(obj => obj.condition.value))

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
      links,
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
