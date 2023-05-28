<script setup lang="ts">
defineProps<{
  title: string
  subTitle?: string
  titleLarger?: boolean
}>()
</script>

<template>
  <header
    class="flex min-h-[168px] flex-col items-center justify-center gap-2 bg-[url('/images/background/header.png')] bg-cover bg-center p-2 text-white"
  >
    <h1
      class="text-3xl font-bold tracking-widest"
      :class="`${titleLarger ? 'text-5xl' : 'text-3xl'}`"
    >
      {{ title }}
    </h1>
    <h2 v-show="subTitle">{{ subTitle }}</h2>
  </header>
</template>
