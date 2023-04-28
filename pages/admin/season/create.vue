<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'
import { compareAsc, format } from 'date-fns'

const timeStartPicker = ref<DatePickerInstance>(null)
const timeEndPicker = ref<DatePickerInstance>(null)

const dates = ref<string[]>([])

const timeStart = ref<string | null>(null)
const timeEnd = ref<string | null>(null)

const pricePerActivity = ref<number | undefined>()
const pricePerSeason = ref<number | undefined>()
const enableSeasonPayment = ref(false)
</script>

<template>
  <header>
    <h1
      class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-3xl text-white"
    >
      創建活動
    </h1>

    <div class="container flex flex-col gap-4 py-8 pb-20">
      <div>
        <h3 class="mb-1">活動名稱</h3>
        <input
          type="text"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>
      <div>
        <h3 class="mb-1">單次費用</h3>
        <input
          type="number"
          v-model.number="pricePerActivity"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>

      <div>
        <label for="toggleSeasonPayment" class="mb-2">
          <input
            v-model="enableSeasonPayment"
            id="toggleSeasonPayment"
            type="checkbox"
          />
          啟用季打收費
        </label>
        <template v-if="enableSeasonPayment">
          <h3 class="mb-1">季打費用</h3>
          <input
            type="number"
            v-model.number="pricePerSeason"
            class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
          />
        </template>
      </div>

      <div class="flex flex-col gap-2">
        <h3>時間</h3>

        <h4>開始時間</h4>
        <VueDatePicker
          ref="timeStartPicker"
          time-picker
          v-model="timeStart"
          model-type="HH:mm"
          :flow="['hours', 'minutes']"
          placeholder="請填入開始時間"
          auto-apply
          :clearable="false"
        ></VueDatePicker>

        <h4>結束時間</h4>
        <VueDatePicker
          ref="timeEndPicker"
          time-picker
          v-model="timeEnd"
          model-type="HH:mm"
          :flow="['hours', 'minutes']"
          placeholder="請填入開始時間"
          auto-apply
          :clearable="false"
        ></VueDatePicker>
      </div>

      <div>
        <h3 class="mb-2">日期</h3>

        <VueDatePicker
          v-model="dates"
          model-type="timestamp"
          inline
          multi-dates
          locale="zh-tw"
          :day-names="['一', '二', '三', '四', '五', '六', '日']"
          format="yyyy/MM/dd"
          @update:model-value="(dates) => dates.sort(compareAsc)"
          :highlight="[new Date()]"
          :min-date="new Date()"
          prevent-min-max-navigation
          :start-time="{ hours: 20, minutes: 0 }"
          :enable-time-picker="false"
          auto-apply
          class="justify-center"
        >
          <template #calendar-header="{ index, day }">
            <div :class="index === 5 || index === 6 ? 'text-red-600' : ''">
              {{ day }}
            </div>
          </template>
        </VueDatePicker>
      </div>

      <ul class="flex flex-col">
        <li
          v-for="(date, index) in dates"
          class="py-1 text-center"
          :class="{ 'bg-neutral-200': index % 2 == 0 }"
        >
          {{ format(new Date(date), 'yyyy/MM/dd (ccc.)') }}
        </li>
      </ul>
      <button @click="dates = []">reset</button>
    </div>
  </header>
</template>
