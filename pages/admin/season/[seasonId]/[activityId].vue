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
const removeTargetRecord = ref<JoinRecordPerActivity & { user: User }>()
const modalConfirmIsOpened = ref(false)

const removeFromRecord = async () => {
  try {
    modalConfirmIsOpened.value = false
    if (!removeTargetRecord.value) return

    siteStore.loading = true

    await $fetch(
      `/api/joinRecordPerActivity/delete/${removeTargetRecord.value.id}`,
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
          <button
            @click="
              () => {
                modalConfirmIsOpened = true
                removeTargetRecord = record
              }
            "
            class="rounded-full bg-red-400 px-4 py-1"
          >
            移除
          </button>
        </li>
      </ul>
    </div>

    <ModalConfirm
      v-model="modalConfirmIsOpened"
      @comfirm="removeFromRecord"
      @close="modalConfirmIsOpened = false"
      >是否要移除 {{ removeTargetRecord?.user.name }} ?</ModalConfirm
    >
  </div>
</template>
