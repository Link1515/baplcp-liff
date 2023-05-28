export const appScriptService = {
  createGroupMessageCronJobs: async (triggerDateTime: Date) => {
    if (!process.env.APP_SCRIPT_URL)
      throw new Error('Cannot found app script url')
    const appScriptUrl = process.env.APP_SCRIPT_URL

    $fetch(appScriptUrl, {
      method: 'POST',
      body: {
        triggerDateTime,
      },
    })
  },
}
