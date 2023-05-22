<script setup lang="ts">
import { User, Activity, Season, JoinRecordPerActivity } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'

const siteStore = useSiteStore()
const userStore = useUserStore()
const route = useRoute()
const activityId = route.params.activityId as string

const activity = ref<Activity & { season: Season }>()
const joinRecord = ref<(JoinRecordPerActivity & { user: User })[]>([])
const userCurrentRecord = ref<JoinRecordPerActivity>()

siteStore.loading = true

const getUserCurrentRecord = async () => {
  userCurrentRecord.value = await $fetch<JoinRecordPerActivity>(
    `/api/joinRecordPerActivity/getUserRecord/${userStore.id}/${activityId}`
  )
}

onBeforeMount(async () => {
  activity.value = await $fetch<Activity & { season: Season }>(
    `/api/activity/${activityId}`
  )

  if (!activity.value) {
    await navigateTo('/')
  }

  await getUserCurrentRecord()

  joinRecord.value = await $fetch<(JoinRecordPerActivity & { user: User })[]>(
    `/api/joinRecordPerActivity/${activityId}`
  )

  siteStore.loading = false
})
</script>
<template>
  <div v-if="activity">
    <ActivityHeader :title="activity.season.name" :date-str="activity.date" />

    <div class="container py-8 pb-20">
      <ActivityInfo
        :current-join-count="joinRecord.length"
        :join-limit="activity.season.activityJoinLimit"
        :price="activity.season.pricePerActivity"
      />

      <ul>
        <li v-for="(record, index) in joinRecord" class="flex">
          <span class="mr-2">{{ index + 1 }}.</span>
          <span class="mr-auto">{{ record.user.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
