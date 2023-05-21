import { useModal } from 'vue-final-modal'
import { User } from '@prisma/client'
import { useUserStore, useSiteStore } from '~/stores'
import ModalCreateUser from '~/components/Modal/CreateUser.vue'

export const useLineLogin = () => {
  const nuxtApp = useNuxtApp()
  const userStore = useUserStore()
  const siteStore = useSiteStore()

  const modalCreateUser = useModal({
    component: ModalCreateUser,
    attrs: {
      onClose() {
        modalCreateUser.close()
      },
    },
  })

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
            modalCreateUser.open()
          }
        },
      })

      userStore.id = user.id
      userStore.isAdmin = user.isAdmin

      // sync user line data to db
      if (user.name !== name || user.avatar !== avatar) {
        await $fetch('/api/user/update', {
          method: 'post',
          body: {
            userId: user.id,
            name,
            avatar,
          },
        })
      }
    } catch (error) {}
    siteStore.loading = false
  })
}
