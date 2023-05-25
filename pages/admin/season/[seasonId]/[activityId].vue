<script setup lang="ts">
import { User, Activity, Season, JoinRecordPerActivity } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'
import ModalConfirm from '~/components/Modal/Confirm.vue'

const siteStore = useSiteStore()
const route = useRoute()
const activityId = route.params.activityId as string

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

/**
 * join record
 */
const { data: joinRecord, refresh: refreshJoinRecord } = await useFetch<
  (JoinRecordPerActivity & { user: User })[]
>(`/api/joinRecordPerActivity/${activityId}`)

siteStore.loading = false

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

    await $fetch('/api/activity/record/update', {
      method: 'post',
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

      <ul class="mb-6">
        <li
          v-for="(record, index) in joinRecord"
          class="flex h-8 items-center px-4"
          :class="{ 'bg-blue-300': pickedRecords.includes(record.id) }"
        >
          <span class="mr-2">{{ index + 1 }}.</span>
          <span class="mr-auto">{{ record.user.name }}</span>
          <input
            v-model="pickedRecords"
            :value="record.id"
            type="checkbox"
            class="h-4 w-4 appearance-none checked:bg-blue-500"
          />
        </li>
      </ul>

      <div v-if="pickedRecords.length > 0" class="container">
        <button
          @click="modalConfirmIsOpened = true"
          class="block w-full bg-red-400"
        >
          移除
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
