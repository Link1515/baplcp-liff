<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    <Header>
      <span class="text-5xl">BAPLCP</span>
    </Header>

    <div class="container">
      <div class="flex flex-col gap-4 py-8 text-center">
        <NuxtLink to="/season" class="primaryBtn">活動清單</NuxtLink>
        <NuxtLink v-if="userStore.isAdmin" to="/admin/season" class="primaryBtn"
          >活動管理</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
