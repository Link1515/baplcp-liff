<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { compareAsc, format } from 'date-fns'
import { z } from 'zod'
import { useSiteStore } from '~/stores'

const siteStore = useSiteStore()

const seasonCreateFormSchema = z
  .object({
    name: z.string().min(1, { message: '請填入活動名稱' }),
    activityJoinLimit: z
      .number({ invalid_type_error: '請填入單次人數限制' })
      .gt(1, { message: '請填入單次人數限制' }),
    pricePerActivity: z.number({ invalid_type_error: '請填入單次費用' }),
    activityStartTime: z
      .string({ required_error: '請填入開始時間' })
      .regex(/^\d{2}:\d{2}$/, { message: '格式錯誤' }),
    activityEndTime: z
      .string({ required_error: '請填入結束時間' })
      .regex(/^\d{2}:\d{2}$/, { message: '格式錯誤' }),
    enableSeasonPayment: z.boolean().default(false),
    pricePerSeason: z
      .number({
        invalid_type_error: '啟用季打收費後，需要再填入季打費用',
      })
      .optional(),
    activityDates: z.number().array(),
  })
  .refine(
    ({ enableSeasonPayment, pricePerSeason }) =>
      enableSeasonPayment ? pricePerSeason !== undefined : true,
    {
      message: '啟用季打收費後，需要再填入季打費用',
      path: ['pricePerSeason'],
    }
  )
  .refine(({ activityDates }) => activityDates.length >= 1, {
    message: '至少需要選擇一個日期',
    path: ['activityDates'],
  })
  .refine(
    ({ activityStartTime, activityEndTime }) => {
      const startHour = parseInt(activityStartTime.split(':')[0])
      const startMin = parseInt(activityStartTime.split(':')[1])
      const endHour = parseInt(activityEndTime.split(':')[0])
      const endMin = parseInt(activityEndTime.split(':')[1])

      return endHour > startHour || (endHour === startHour && endMin > startMin)
    },
    { message: '結束時間必須大於開始時間', path: ['activityTime'] }
  )

export type SeasonCreateForm = z.infer<typeof seasonCreateFormSchema>

const form = ref<SeasonCreateForm>({
  name: '',
  activityJoinLimit: 0,
  pricePerActivity: 0,
  activityStartTime: '00:00',
  activityEndTime: '00:00',
  enableSeasonPayment: false,
  pricePerSeason: undefined,
  activityDates: [],
})

const formErrors = ref<{ [key: string]: string[] }>({})

const resetForm = () => {
  form.value = {
    name: '',
    activityJoinLimit: 0,
    pricePerActivity: 0,
    activityStartTime: '00:00',
    activityEndTime: '00:00',
    enableSeasonPayment: false,
    pricePerSeason: undefined,
    activityDates: [],
  }

  formErrors.value = {}
}

watch(
  () => form.value.enableSeasonPayment,
  () => {
    if (!form.value.enableSeasonPayment) {
      form.value.pricePerSeason = undefined
    }
  }
)

const submit = async () => {
  try {
    const validatedForm = seasonCreateFormSchema.parse(form.value)

    siteStore.loading = true
    await $fetch('/api/season/create', {
      method: 'post',
      body: validatedForm,
    })

    resetForm()

    await navigateTo('/admin/season')
  } catch (error) {
    if (error instanceof z.ZodError) {
      formErrors.value = {}

      error.issues.forEach((issue) => {
        const issueMessages = formErrors.value[issue.path[0]]
        if (issueMessages) {
          issueMessages.push(issue.message)
        } else {
          formErrors.value[issue.path[0]] = [issue.message]
        }
      })

      scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div>
    <h1
      class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-3xl text-white"
    >
      創建活動
    </h1>

    <div class="container flex flex-col gap-4 py-8 pb-20">
      <div>
        <h3 class="text-lg">活動名稱</h3>
        <small v-for="error in formErrors.name" class="text-red-600">{{
          error
        }}</small>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>
      <div>
        <h3 class="mb-1 text-lg">單次人數上限</h3>
        <small
          v-for="error in formErrors.activityJoinLimit"
          class="text-red-600"
          >{{ error }}</small
        >
        <input
          v-model.number="form.activityJoinLimit"
          type="number"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>
      <div>
        <h3 class="mb-1 text-lg">單次費用</h3>
        <small
          v-for="error in formErrors.pricePerActivity"
          class="text-red-600"
          >{{ error }}</small
        >
        <input
          v-model.number="form.pricePerActivity"
          type="number"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>

      <div>
        <label for="toggleSeasonPayment" class="mb-2">
          <input
            v-model="form.enableSeasonPayment"
            id="toggleSeasonPayment"
            type="checkbox"
          />
          啟用季打收費
        </label>
        <template v-if="form.enableSeasonPayment">
          <h3 class="mb-1">季打費用</h3>
          <small
            v-for="error in formErrors.pricePerSeason"
            class="text-red-600"
            >{{ error }}</small
          >
          <input
            v-model.number="form.pricePerSeason"
            type="number"
            class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
          />
        </template>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="text-lg">時間</h3>
        <small v-for="error in formErrors.activityTime" class="text-red-600">{{
          error
        }}</small>

        <h4>開始時間</h4>
        <VueDatePicker
          time-picker
          v-model="form.activityStartTime"
          model-type="HH:mm"
          :flow="['hours', 'minutes']"
          placeholder="請填入開始時間"
          auto-apply
          :clearable="false"
        ></VueDatePicker>

        <h4>結束時間</h4>
        <VueDatePicker
          time-picker
          v-model="form.activityEndTime"
          model-type="HH:mm"
          :flow="['hours', 'minutes']"
          placeholder="請填入開始時間"
          auto-apply
          :clearable="false"
        ></VueDatePicker>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="text-lg">日期</h3>
        <small v-for="error in formErrors.activityDates" class="text-red-600">{{
          error
        }}</small>

        <VueDatePicker
          v-model="form.activityDates"
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
          v-for="(date, index) in form.activityDates"
          class="py-1 text-center"
          :class="{ 'bg-neutral-200': index % 2 == 0 }"
        >
          {{ format(new Date(date), 'yyyy/MM/dd (ccc.)') }}
        </li>
      </ul>
      <button @click="form.activityDates = []">重選日期</button>
      <button @click="submit">完成</button>
    </div>
  </div>
</template>
