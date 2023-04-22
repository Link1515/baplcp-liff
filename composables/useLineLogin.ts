import { useModal } from 'vue-final-modal'
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
      userStore.name = lineUserProfile.name || ''
      userStore.avatar = lineUserProfile.picture || ''

      // attempt to find user
      await $fetch(`/api/user/${lineId}`, {
        onResponseError: async (error) => {
          if (error.response.status === 404) {
            // if user not found then create one
            modalCreateUser.open()
          }
        },
      })
    } catch (error) {}
    siteStore.loading = false
  })
}
