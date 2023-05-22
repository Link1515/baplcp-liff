<script setup lang="ts">
defineProps<{
  currentJoinCount: number
  joinLimit: number
  price: number
}>()
</script>

<template>
  <h3 class="text-center text-xl">
    報名人數： {{ currentJoinCount }}/{{ joinLimit }}
  </h3>
  <h3 class="mb-4 text-center text-xl">費用： {{ price }} NTD</h3>
</template>
