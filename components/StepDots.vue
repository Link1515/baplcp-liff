<script setup lang="ts">
defineProps<{
  length: number
  at: number
}>()
</script>

<template>
  <div class="flex justify-center gap-2">
    <span
      v-for="i in length"
      class="h-[6px] w-[6px] rounded-full"
      :class="`${i - 1 === at ? 'bg-[#428EFF]' : 'bg-[#979797] bg-opacity-40'}`"
    ></span>
  </div>
</template>
