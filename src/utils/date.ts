export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const isExpired = (dateString: string | null): boolean => {
  if (!dateString) return true
  const date = new Date(dateString)
  return date.getTime() < Date.now()
}

export const getDaysRemaining = (dateString: string | null): number => {
  if (!dateString) return 0
  const date = new Date(dateString)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
} 