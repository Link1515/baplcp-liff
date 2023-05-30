<script setup lang="ts">
import { uid } from 'uid'

const props = defineProps<{
  name: string
  value: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string): void
}>()

const id = `${props.name}-${uid()}`

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const isActive = computed(() => modelValue.value === props.value)
</script>

<template>
  <label
    :for="id"
    class="flex h-16 w-full items-center gap-3 rounded-lg border p-5 font-medium transition-colors"
    :class="`${
      isActive ? 'border-primary bg-[#eef0ff] text-primary' : 'border-[#D3D6DE]'
    }`"
  >
    <input
      type="radio"
      v-model="modelValue"
      :name="name"
      :value="value"
      :id="id"
      class="hidden"
    />
    <div
      class="grid h-5 w-5 place-items-center rounded-full border-2 border-[#BFC8D4]"
      :class="`${isActive ? 'border-primary' : 'border-[#BFC8D4]'}`"
    >
      <span
        class="h-2 w-2 rounded-full"
        :class="`${isActive ? 'bg-primary' : ''}`"
      ></span>
    </div>
    <slot />
  </label>
</template>
