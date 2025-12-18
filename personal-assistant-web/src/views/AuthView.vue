<template>
  <div class="auth">
    <div class="auth-container">
      <div class="auth-tabs">
        <button 
          :class="{ active: activeTab === 'login' }"
          @click="switchTab('login')"
        >
          Login
        </button>
        <button 
          :class="{ active: activeTab === 'signup' }"
          @click="switchTab('signup')"
        >
          Sign Up
        </button>
      </div>

      <div class="auth-form">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
          <h2>Login</h2>
          <div class="form-group">
            <label for="login-email">Email</label>
            <input 
              id="login-email"
              v-model="loginForm.email"
              type="email" 
              required 
              placeholder="Enter your email"
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input 
              id="login-password"
              v-model="loginForm.password"
              type="password" 
              required 
              placeholder="Enter your password"
              :disabled="isLoading"
            />
          </div>
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <form v-if="activeTab === 'signup'" @submit.prevent="handleSignup">
          <h2>Sign Up</h2>
          <div class="form-group">
            <label for="signup-name">Name</label>
            <input 
              id="signup-name"
              v-model="signupForm.name"
              type="text" 
              required 
              placeholder="Enter your name"
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input 
              id="signup-email"
              v-model="signupForm.email"
              type="email" 
              required 
              placeholder="Enter your email"
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="signup-password">Password</label>
            <input 
              id="signup-password"
              v-model="signupForm.password"
              type="password" 
              required 
              placeholder="Create a password"
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="signup-confirm-password">Confirm Password</label>
            <input 
              id="signup-confirm-password"
              v-model="signupForm.confirmPassword"
              type="password" 
              required 
              placeholder="Confirm your password"
              :disabled="isLoading"
            />
          </div>
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Signing up...' : 'Sign Up' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signin, signup } from '../services/authService'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { saveAuthToStorage } = useAuth()

const activeTab = ref('login')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const signupForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const switchTab = (tab) => {
  activeTab.value = tab
  clearMessages()
}

const handleLogin = async () => {
  clearMessages()
  isLoading.value = true

  try {
    const response = await signin({
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    
    saveAuthToStorage(response)
    successMessage.value = 'Login successful!'
    
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleSignup = async () => {
  clearMessages()

  if (signupForm.value.password !== signupForm.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true

  try {
    const response = await signup({
      name: signupForm.value.name,
      email: signupForm.value.email,
      password: signupForm.value.password
    })
    
    successMessage.value = 'Signup successful! Please login.'
    
    setTimeout(() => {
      activeTab.value = 'login'
      signupForm.value = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }, 1500)
  } catch (error) {
    errorMessage.value = error.message || 'Signup failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

.auth-tabs button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.auth-tabs button:hover {
  background: #f5f5f5;
}

.auth-tabs button.active {
  color: #646cff;
  border-bottom: 2px solid #646cff;
  background: #f5f5f5;
}

.auth-form {
  padding: 2rem;
}

.auth-form h2 {
  margin: 0 0 1.5rem 0;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #646cff;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #535bf2;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  border: 1px solid #fcc;
  font-size: 0.9rem;
}

.success-message {
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #efe;
  color: #3c3;
  border-radius: 4px;
  border: 1px solid #cfc;
  font-size: 0.9rem;
}
</style>

