<script setup lang="ts">
import { format } from 'date-fns'
import { Season } from '@prisma/client'
import { useSiteStore } from '~/stores'

const siteStore = useSiteStore()

const seasonList = ref<Season[]>([])

siteStore.loading = true

onBeforeMount(async () => {
  seasonList.value = await $fetch('/api/season/')
  siteStore.loading = false
})
</script>

<template>
  <div>
    <header>
      <h1
        class="flex h-28 items-center justify-center bg-blue-950 text-center text-3xl text-white"
      >
        活動清單
      </h1>
    </header>

    <div class="container">
      <div class="flex flex-col gap-4 py-8 text-center">
        <NuxtLink
          v-for="season in seasonList"
          :to="`/admin/season/${season.id}`"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>{{ season.name }}</h2>
          <small
            >{{ format(new Date(season.startDate), 'yyyy/MM/dd (ccc.)') }}
            ~
            {{ format(new Date(season.endDate), 'yyyy/MM/dd (ccc.)') }}</small
          >
        </NuxtLink>

        <NuxtLink
          to="/admin/season/create"
          class="grid place-items-center bg-slate-300 py-2"
          >+</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
