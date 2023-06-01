<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
const route = useRoute()

;(() => {
  if (!userStore.info?.isAdmin) return navigateTo('/')
  if (/admin\/?/.test(route.path)) return navigateTo('/admin/season')
})()
</script>

<template>
  <NuxtPage />
</template>
