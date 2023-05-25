<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{
  title: string
  dateStr: Date | string
}>()
</script>

<template>
  <header>
    <h1
      class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-white"
    >
      <span class="text-3xl">{{ title }}</span>
      <small class="text-xl">{{
        format(new Date(dateStr), 'yyyy/MM/dd (ccc.)')
      }}</small>
    </h1>
  </header>
</template>
