<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    <Header title="BAPLCP" title-larger />

    <div class="container py-8">
      <div class="flex flex-col gap-4 text-center">
        <NuxtLink to="/season" class="primaryBtn">活動清單</NuxtLink>
        <NuxtLink
          v-if="userStore.info?.isAdmin"
          to="/admin/season"
          class="primaryBtn"
          >活動管理</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
