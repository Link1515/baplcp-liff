import liff from '@line/liff'

export default defineNuxtPlugin(async () => {
  try {
    const config = useRuntimeConfig()

    await liff.init({ liffId: config.public.liffId })

    console.log('LIFF init succeeded.')
  } catch (error) {
    console.log('LIFF init failed.')
    console.log(error)
  }

  return {
    provide: {
      liff
    }
  }
})
