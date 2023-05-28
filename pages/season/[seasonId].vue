<script setup lang="ts">
import { format } from 'date-fns'
import { Season, Activity } from '@prisma/client'
import { useSiteStore } from '~/stores'

const siteStore = useSiteStore()
const route = useRoute()
const seasonId = route.params.seasonId as string

siteStore.loading = true

const { data: season } = await useFetch<Season & { activity: Activity[] }>(
  `/api/season/${seasonId}`
)

siteStore.loading = false

watchEffect(() => {
  if (!season.value) {
    return navigateTo('/')
  }
})
</script>

<template>
  <div v-if="season">
    <Header
      :title="season.name"
      :sub-title="`${format(
        new Date(season.startDate),
        'yyyy/MM/dd (ccc.)'
      )} ~ ${format(new Date(season.endDate), 'yyyy/MM/dd (ccc.)')}`"
    />

    <div class="container py-8">
      <div class="flex flex-col gap-4 text-center">
        <NuxtLink
          v-for="activity in season.activity"
          :to="`/activity/${activity.id}`"
          class="primaryBtn"
        >
          <h2>{{ format(new Date(activity.date), 'yyyy/MM/dd (ccc.)') }}</h2>
        </NuxtLink>
        <!-- <NuxtLink
          to="/season/1233/seasonMember"
          class="primaryBtn"
        >
          <h2>季打</h2>
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>
