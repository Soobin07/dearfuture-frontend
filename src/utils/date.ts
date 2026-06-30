export const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getDDayText = (dateTime: string) => {
  const today = new Date()
  const target = new Date(dateTime)

  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)

  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `D-${diffDays}`
  }

  if (diffDays === 0) {
    return '오늘 공개'
  }

  return '공개됨'
}