<script setup lang="ts">
import { format, compareAsc, intervalToDuration } from 'date-fns'
import { User, Activity, Season, JoinRecordPerActivity } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'
import ModalAlert from '~/components/Modal/Alert.vue'

const siteStore = useSiteStore()
const userStore = useUserStore()
const route = useRoute()
const activityId = route.params.activityId as string

siteStore.loading = true

/**
 * activity data
 */
const { data: activity, pending: activityPending } = useFetch<
  Activity & { season: Season }
>(`/api/activity/${activityId}`)

const beforeAllowedJoinDate = computed(() =>
  activity.value
    ? compareAsc(new Date(activity.value.allowedJoinDate), new Date()) > 0
    : false
)
const afterJoinDeadline = computed(() =>
  activity.value
    ? compareAsc(new Date(), new Date(activity.value.joinDeadline)) > 0
    : false
)

/**
 * join record
 */
const {
  data: joinRecord,
  refresh: refreshJoinRecord,
  pending: joinRecordPending,
} = useFetch<(JoinRecordPerActivity & { user: User })[]>(
  `/api/activity/record/${activityId}`
)

const userCurrentRecord = computed(() =>
  joinRecord.value?.find((record) => record.userId === userStore.id)
)

/**
 * loading finish when all fetch pending is false
 */
watchEffect(() => {
  if (activityPending.value || joinRecordPending.value) return
  if (!userStore.id) return
  if (!activity.value) return navigateTo('/')

  siteStore.loading = false
})

/**
 * actions
 */
const modalAlertIsOpened = ref(false)

const join = async () => {
  try {
    if (joinRecordPending.value) return

    siteStore.loading = true

    await $fetch('/api/activity/record', {
      method: 'POST',
      body: {
        userId: userStore.id,
        activityId,
      },
    })
    await refreshJoinRecord()

    modalAlertIsOpened.value = true
    siteStore.loading = false
  } catch (error) {}
}

/**
 * remaining time
 */

const remainingTime = ref<Duration>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})
const getRemainingTime = () => {
  if (!activity.value) return

  remainingTime.value = intervalToDuration({
    start: new Date(),
    end: new Date(activity.value.joinDeadline),
  })
}

let timer: NodeJS.Timer
if (!beforeAllowedJoinDate.value && !afterJoinDeadline.value) {
  getRemainingTime()

  timer = setInterval(getRemainingTime, 1000)
  onUnmounted(() => clearInterval(timer))
}

const remainingTimeStr = computed(() => durationToStr(remainingTime.value))
</script>

<template>
  <div v-if="activity && joinRecord">
    <Header>
      <span class="text-3xl">{{ activity.season.name }}</span>
      <small class="text-xl">{{
        format(new Date(activity.date), 'yyyy/MM/dd (ccc.)')
      }}</small>
    </Header>

    <div
      v-show="!beforeAllowedJoinDate && !afterJoinDeadline"
      class="container bg-red-600 py-1 text-center text-white"
    >
      距離報名截止： {{ remainingTimeStr }}
    </div>

    <div class="container py-8 pb-20">
      <ActivityInfo
        :current-join-count="joinRecord.length"
        :join-limit="activity.season.activityJoinLimit"
        :price="activity.season.pricePerActivity"
        :start-time="activity.season.activityStartTime"
        :end-time="activity.season.activityEndTime"
      />

      <ul class="divide-y divide-neutral-300">
        <li v-for="(record, index) in joinRecord" class="flex py-2">
          <span class="mr-2">{{ index + 1 }}.</span>
          <span class="mr-auto">{{ record.user.name }}</span>
          <div class="h-6">
            <img
              v-show="record.hasPaid"
              src="/images/icons/dollar.png"
              class="mr-2 h-6 w-6"
              alt="dollar"
            />
          </div>
        </li>
      </ul>
    </div>

    <div
      class="fixed bottom-0 flex h-16 w-full items-center justify-center bg-slate-300 px-4"
    >
      <span
        v-if="beforeAllowedJoinDate"
        class="rounded-full bg-neutral-400 px-4 py-1"
        >尚未開放</span
      >
      <span
        v-else-if="afterJoinDeadline"
        class="rounded-full bg-neutral-400 px-4 py-1"
        >報名已截止</span
      >
      <span
        v-else-if="userCurrentRecord"
        class="rounded-full bg-green-500 px-4 py-1"
      >
        已報名
      </span>
      <button v-else @click="join" class="rounded-full bg-green-500">
        立即報名
      </button>
    </div>

    <ModalAlert v-model="modalAlertIsOpened" @close="modalAlertIsOpened = false"
      >報名完成後，請將當次費用轉給管理員，並通知管理員已繳費</ModalAlert
    >
  </div>
</template>
