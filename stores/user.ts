export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const lineId = ref('')
  const isAdmin = ref(false)
  const name = ref('')
  const realName = ref('')
  const avatar = ref('')

  return {
    id,
    lineId,
    isAdmin,
    name,
    realName,
    avatar,
  }
})
