<script setup lang="ts">
import { User, Activity, Season, JoinRecordPerActivity } from '@prisma/client'
import { useSiteStore } from '~/stores'
import ModalConfirm from '~/components/Modal/Confirm.vue'

const siteStore = useSiteStore()
const route = useRoute()
const activityId = route.params.activityId as string

siteStore.loading = true

/**
 * activity data
 */
const { data: activity, pending: activityPending } = useFetch<
  Activity & { season: Season }
>(`/api/activity/${activityId}`)

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

/**
 * loading finish when all fetch pending is false
 */
watchEffect(() => {
  if (activityPending.value || joinRecordPending.value) return
  if (!activity.value) return navigateTo('/')

  siteStore.loading = false
})

/**
 * actions
 */
const modalConfirmIsOpened = ref(false)
const pickedRecords = ref<string[]>([])

const removeRecords = async () => {
  try {
    modalConfirmIsOpened.value = false
    if (pickedRecords.value.length < 0) return

    siteStore.loading = true
    await $fetch('/api/activity/record', {
      method: 'PATCH',
      body: {
        recordIds: pickedRecords.value,
        data: { active: false },
      },
    })

    pickedRecords.value = []

    await refreshJoinRecord()
  } catch (error) {}

  siteStore.loading = false
}

const setRecordHadPaid = async (hasPaid: boolean) => {
  try {
    if (pickedRecords.value.length < 0) return

    siteStore.loading = true
    await $fetch('/api/activity/record', {
      method: 'PATCH',
      body: {
        recordIds: pickedRecords.value,
        data: { hasPaid },
      },
    })

    pickedRecords.value = []

    await refreshJoinRecord()
  } catch (error) {}

  siteStore.loading = false
}
</script>
<template>
  <div v-if="activity && joinRecord">
    <ActivityHeader :title="activity.season.name" :date-str="activity.date" />

    <div class="pb-20 pt-8">
      <ActivityInfo
        :current-join-count="joinRecord.length"
        :join-limit="activity.season.activityJoinLimit"
        :price="activity.season.pricePerActivity"
      />

      <ul class="mb-6 divide-y divide-neutral-300">
        <li
          v-for="(record, index) in joinRecord"
          :key="record.id"
          class="flex h-8 items-center px-4 py-2"
          :class="{ 'bg-blue-300': pickedRecords.includes(record.id) }"
        >
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
          <input
            v-model="pickedRecords"
            :value="record.id"
            type="checkbox"
            class="h-4 w-4"
          />
        </li>
      </ul>

      <div
        v-if="pickedRecords.length > 0"
        class="container flex flex-col gap-2"
      >
        <button
          @click="modalConfirmIsOpened = true"
          class="block w-full bg-red-400"
        >
          移除
        </button>
        <button @click="setRecordHadPaid(true)" class="block w-full">
          標記為已繳費
        </button>
        <button @click="setRecordHadPaid(false)" class="block w-full">
          標記為未繳費
        </button>
      </div>
    </div>

    <ModalConfirm
      v-model="modalConfirmIsOpened"
      @comfirm="removeRecords"
      @close="modalConfirmIsOpened = false"
      >是否確定移除?</ModalConfirm
    >
  </div>
</template>
