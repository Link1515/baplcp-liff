export const durationToStr = (duration: Duration): string => {
  const days = duration.days
  const hours = duration.hours || 0
  const minutes = duration.minutes || 0
  const seconds = duration.seconds || 0

  if (!days && !hours && !minutes) {
    return `${seconds.toString().padStart(2, '0')} 秒`
  } else if (!days && !hours) {
    return `${minutes.toString().padStart(2, '0')} 分鐘 ${seconds
      .toString()
      .padStart(2, '0')} 秒`
  } else if (!days) {
    return `${hours.toString().padStart(2, '0')} 小時 ${minutes
      .toString()
      .padStart(2, '0')} 分鐘 ${seconds.toString().padStart(2, '0')} 秒`
  }

  return `${days} 天 ${hours.toString().padStart(2, '0')} 小時 ${minutes
    .toString()
    .padStart(2, '0')} 分鐘 ${seconds.toString().padStart(2, '0')} 秒`
}
