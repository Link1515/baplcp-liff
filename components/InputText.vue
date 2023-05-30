<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    v-model="modelValue"
    type="text"
    class="w-full rounded-lg border border-[#D3D6DE] px-4 py-3 caret-primary outline-none outline-offset-0 transition-colors selection:bg-[#dde0ff] focus:border-primary focus:outline-4 focus:outline-[#dde0ff]"
  />
</template>
