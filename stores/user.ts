import { User } from '@prisma/client'

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const lineId = ref('')
  const isAdmin = ref(false)
  const name = ref('')
  const avatar = ref('')
  const info = ref<User>()

  return {
    id,
    lineId,
    isAdmin,
    name,
    avatar,
    info,
  }
})
