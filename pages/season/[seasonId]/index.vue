<script setup lang="ts">
import { format } from 'date-fns'
import { Season, Activity } from '@prisma/client'
import { useSiteStore } from '~/stores'

const siteStore = useSiteStore()
const route = useRoute()
const seasonId = route.params.seasonId as string

const season = ref<Season & { activity: Activity[] }>()

siteStore.loading = true

onBeforeMount(async () => {
  season.value = await $fetch(`/api/season/${seasonId}`)

  siteStore.loading = false

  if (!season.value) {
    await navigateTo('/')
  }
})
</script>

<template>
  <div v-if="season">
    <header>
      <h1
        class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-white"
      >
        <span class="my-auto text-3xl">{{ season.name }}</span>
        <small class="text-xl"
          >{{ format(new Date(season.startDate), 'yyyy/MM/dd (ccc.)') }} ~
          {{ format(new Date(season.endDate), 'yyyy/MM/dd (ccc.)') }}</small
        >
        <small class="text-xl"
          >{{ season.activityStartTime }} ~ {{ season.activityEndTime }}</small
        >
      </h1>
    </header>

    <div class="container py-8">
      <div class="flex flex-col gap-4 text-center">
        <NuxtLink
          v-for="activity in season.activity"
          :to="`/season/${seasonId}/${activity.id}`"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>{{ format(new Date(activity.date), 'yyyy/MM/dd (ccc.)') }}</h2>
        </NuxtLink>
        <!-- <NuxtLink
          to="/season/1233/seasonMember"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>季打</h2>
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>
