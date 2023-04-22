<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
const route = useRoute()

;(() => {
  if (!userStore.isAdmin) return navigateTo('/')
  if (/admin\/?/.test(route.path)) return navigateTo('/admin/events')
})()
</script>

<template>
  <NuxtPage />
</template>
