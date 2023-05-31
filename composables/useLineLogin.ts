import { User } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'

export const useLineLogin = () => {
  const nuxtApp = useNuxtApp()
  const userStore = useUserStore()
  const siteStore = useSiteStore()

  siteStore.loading = true

  onMounted(async () => {
    try {
      if (!nuxtApp.$liff.isLoggedIn()) {
        nuxtApp.$liff.login()
      }
      const lineUserProfile = nuxtApp.$liff.getDecodedIDToken()
      if (!lineUserProfile) throw new Error('Failed to get line profile')

      const lineId = lineUserProfile.sub || ''
      if (!lineId) throw new Error('Failed to get line id')

      userStore.lineId = lineId

      const name = lineUserProfile.name as string
      const avatar = lineUserProfile.picture as string

      userStore.name = name
      userStore.avatar = avatar

      // attempt to find user
      const user = await $fetch<User>(`/api/user/${lineId}`, {
        onResponseError: async (error) => {
          if (error.response.status === 404) {
            // if user not found then create one
            await navigateTo('/register')
          }
        },
      })

      userStore.info = user

      if (!user.isChecked) {
        await navigateTo('/register')
      }

      userStore.id = user.id
      userStore.isAdmin = user.isAdmin

      // sync user line data to db
      if (user.name !== name || user.avatar !== avatar) {
        await $fetch('/api/user', {
          method: 'PATCH',
          body: {
            userId: user.id,
            name,
            avatar,
          },
        })
      }
      siteStore.loading = false
    } catch (error) {}
  })
}
