<template>
  <Renderer>
    <Layout />
  </Renderer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Renderer } from '@/three'
import Layout from '@/layout/Layout.vue'

export default defineComponent({
  components: {
    Layout,
    Renderer,
  },
  name: 'App',
})
</script>
