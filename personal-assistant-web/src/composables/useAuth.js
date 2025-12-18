import { ref, computed } from 'vue'

const AUTH_STORAGE_KEY = 'auth_data'

const authData = ref(null)

const loadAuthFromStorage = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      authData.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading auth from storage:', error)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

const saveAuthToStorage = (data) => {
  try {
    authData.value = data
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving auth to storage:', error)
  }
}

const clearAuth = () => {
  authData.value = null
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const useAuth = () => {
  const isAuthenticated = computed(() => authData.value !== null)
  
  const user = computed(() => authData.value?.user || null)
  const token = computed(() => authData.value?.accessToken || authData.value?.token || null)

  return {
    authData,
    isAuthenticated,
    user,
    token,
    loadAuthFromStorage,
    saveAuthToStorage,
    clearAuth
  }
}

