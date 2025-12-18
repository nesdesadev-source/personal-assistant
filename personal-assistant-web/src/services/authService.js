import { getApiUrl } from '../config/api'

export const signup = async (userData) => {
  const response = await fetch(getApiUrl('auth/signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signup failed' }))
    throw new Error(error.message || 'Signup failed')
  }

  return await response.json()
}

export const signin = async (credentials) => {
  const response = await fetch(getApiUrl('auth/signin'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signin failed' }))
    throw new Error(error.message || 'Signin failed')
  }

  return await response.json()
}

