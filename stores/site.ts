export const useSiteStore = defineStore('site', () => {
  const loading = ref(false)

  return {
    loading,
  }
})
