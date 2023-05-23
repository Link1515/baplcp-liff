<script setup lang="ts">
import { compareAsc } from 'date-fns'
import { User, Activity, Season, JoinRecordPerActivity } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'

const siteStore = useSiteStore()
const userStore = useUserStore()
const route = useRoute()
const activityId = route.params.activityId as string
let timer: NodeJS.Timer

siteStore.loading = true

/**
 * activity data
 */
const activity = ref<Activity & { season: Season }>()

activity.value = await $fetch<Activity & { season: Season }>(
  `/api/activity/${activityId}`
)
if (!activity.value) {
  await navigateTo('/')
}

const beforeAllowedJoinDate = ref(false)
const afterJoinDeadline = ref(false)

beforeAllowedJoinDate.value =
  compareAsc(new Date(activity.value.allowedJoinDate), new Date()) > 0
afterJoinDeadline.value =
  compareAsc(new Date(), new Date(activity.value.joinDeadline)) > 0

/**
 * join record
 */
const { data: joinRecord, refresh: refreshJoinRecord } = await useFetch<
  (JoinRecordPerActivity & { user: User })[]
>(`/api/joinRecordPerActivity/${activityId}`)

const userCurrentRecord = computed(() =>
  joinRecord.value?.find((record) => record.userId === userStore.id)
)

siteStore.loading = false

onMounted(async () => {
  if (!beforeAllowedJoinDate.value && !afterJoinDeadline.value) {
    // timer = setInterval(async () => {
    //   joinRecord.value = await $fetch<
    //     (JoinRecordPerActivity & { user: User })[]
    //   >(`/api/joinRecordPerActivity/${activityId}`)
    // }, 5000)
  }
})

onUnmounted(() => {
  clearInterval(timer)
})

const join = async () => {
  try {
    siteStore.loading = true

    await $fetch('/api/joinRecordPerActivity', {
      method: 'post',
      body: {
        userId: userStore.id,
        activityId,
      },
    })
    await refreshJoinRecord()

    siteStore.loading = false
  } catch (error) {}
}

const removeFromRecord = async () => {
  try {
    if (!userCurrentRecord.value) return

    siteStore.loading = true

    await $fetch(
      `/api/joinRecordPerActivity/delete/${userCurrentRecord.value.id}`,
      { method: 'post' }
    )
    await refreshJoinRecord()

    siteStore.loading = false
  } catch (error) {}
}
</script>

<template>
  <div v-if="activity && joinRecord">
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

    <div
      class="fixed bottom-0 flex h-16 w-full items-center justify-center bg-slate-300 px-4"
    >
      <template v-if="beforeAllowedJoinDate">
        <span class="rounded-full bg-neutral-400 px-4 py-1">尚未開放</span>
      </template>
      <template v-else-if="afterJoinDeadline">
        <span class="rounded-full bg-neutral-400 px-4 py-1">活動已截止</span>
      </template>
      <template v-else-if="userCurrentRecord">
        <button
          @click="removeFromRecord"
          class="rounded-full bg-red-400 px-4 py-1"
        >
          取消報名
        </button>
      </template>
      <template v-else>
        <button @click="join" class="rounded-full bg-green-500 px-4 py-1">
          立即報名
        </button>
      </template>
    </div>
  </div>
</template>
