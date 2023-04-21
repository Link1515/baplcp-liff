export const useUserStore = defineStore('user', () => {
  const lineId = ref('')
  const name = ref('')
  const avatar = ref('')

  return {
    lineId,
    name,
    avatar,
  }
})
