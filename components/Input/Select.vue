<script setup lang="ts">
interface SelectItem {
  id: string
  name: string
}

const props = defineProps<{
  modelValue: SelectItem
  list: SelectItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectItem): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const focus = ref(false)

const filteredList = computed(() =>
  props.list.filter((item) => item.name.includes(props.modelValue.name))
)

const autoFillId = () => {
  const matchedItem = props.list.find(
    (item) => item.name === modelValue.value.name
  )

  if (matchedItem) {
    return (modelValue.value = matchedItem)
  }

  modelValue.value.id = ''
}
</script>

<template>
  <div class="relative">
    <InputText
      v-model="modelValue.name"
      @focus="focus = true"
      @blur="focus = false"
      @input="autoFillId"
    />
    <div
      class="absolute top-[calc(100%+8px)] z-40 grid w-full bg-white transition-[grid-template-rows]"
      :class="`${focus ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`"
    >
      <ul
        class="flex flex-col overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)]"
      >
        <li
          v-for="item in filteredList"
          @click="emit('update:modelValue', item)"
          class="px-3 py-4 hover:bg-[#dde0ff]"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
