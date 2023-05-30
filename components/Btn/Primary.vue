<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="mx-auto grid h-12 min-w-[260px] place-items-center rounded-xl text-white transition-colors"
    :class="`${disabled ? 'bg-[#BFC8D4]' : ' bg-primary'}`"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
