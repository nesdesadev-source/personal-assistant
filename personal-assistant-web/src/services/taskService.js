import { getApiUrl } from '../config/api'

export const sendMessage = async (text, token) => {
  const response = await fetch(getApiUrl('tasks/send'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to send message' }))
    throw new Error(error.message || 'Failed to send message')
  }

  return await response.json()
}
