<script setup lang="ts">
import { format } from 'date-fns'
import { Season } from '@prisma/client'
import { useSiteStore } from '~/stores'

const siteStore = useSiteStore()

siteStore.loading = true

const { data: seasonList } = await useFetch<Season[]>('/api/season')

siteStore.loading = false
</script>

<template>
  <div>
    <Header title="活動清單" />

    <div class="container py-8">
      <div class="flex flex-col gap-4 text-center">
        <NuxtLink
          v-for="season in seasonList"
          :to="`/season/${season.id}`"
          class="primaryBtn"
        >
          <h2>{{ season.name }}</h2>
          <small
            >{{ format(new Date(season.startDate), 'yyyy/MM/dd (ccc.)') }}
            ~
            {{ format(new Date(season.endDate), 'yyyy/MM/dd (ccc.)') }}</small
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
