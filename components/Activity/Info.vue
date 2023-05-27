<script setup lang="ts">
defineProps<{
  currentJoinCount: number
  joinLimit: number
  price: number
  startTime: string
  endTime: string
}>()
</script>

<template>
  <div class="mx-auto mb-4 w-fit text-xl">
    <h3>費用： {{ price }} NTD</h3>
    <h3>時間： {{ startTime }} ~ {{ endTime }}</h3>
    <h3>報名人數： {{ currentJoinCount }} / {{ joinLimit }}</h3>
  </div>
</template>
