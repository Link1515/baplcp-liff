<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    <header>
      <h1
        class="flex h-28 items-center justify-center bg-blue-950 text-center text-5xl text-white"
      >
        BAPLCP
      </h1>
    </header>

    <div class="container">
      <div class="flex flex-col gap-4 py-8 text-center">
        <NuxtLink to="/season" class="grid place-items-center bg-slate-300 py-2"
          >活動清單</NuxtLink
        >
        <NuxtLink
          v-if="userStore.isAdmin"
          to="/admin/season"
          class="grid place-items-center bg-slate-300 py-2"
          >活動管理</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
