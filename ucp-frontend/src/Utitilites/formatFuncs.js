export function formatDate(dateString) {
  if (!dateString) return null // If date not getted, return 'null'

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month number fix 2 digits
  const day = date.getDate().toString().padStart(2, '0') // Day number fix 2 digits

  return `${year}.${month}.${day}`
}

export function formatCurrency(amount) {
  if (!amount && amount !== 0) return null // If data is not getted, return 'null'

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0 // Minimum digits number
  }).format(amount)

  return formattedAmount.replace('$', '').trim() + ' $'
}

export function formatPlaytime(minutes) {
  if (!minutes && minutes !== 0) return null // If data is not getted, return 'null'

  const hours = Math.floor(minutes / 60) // Hours math method
  const remainingMinutes = minutes % 60 // Lefted minutes math method

  return `${hours} óra ${remainingMinutes} perc`
}