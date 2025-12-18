<template>
  <div class="home">
    <Sidebar />
    <ChatArea 
      :messages="messages"
      :is-loading="isLoading"
      @send-message="handleSendMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import ChatArea from '../components/ChatArea.vue'
import { useAuth } from '../composables/useAuth'
import { sendMessage } from '../services/taskService'

const isLoading = ref(false)
const { token, loadAuthFromStorage } = useAuth()

onMounted(() => {
  loadAuthFromStorage()
})

const messages = ref([
  {
    type: 'system',
    text: 'Welcome to your personal assistant! How can I help you today?',
    timestamp: new Date()
  }
])

const handleSendMessage = async (messageText) => {
  if (!messageText.trim() || isLoading.value) return

  const userMessage = {
    type: 'user',
    text: messageText,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  isLoading.value = true

  try {
    if (token.value) {
      const result = await sendMessage(messageText, token.value)
      console.log('Send message result:', result)
      
      if (result.message) {
        const assistantMessage = {
          type: 'assistant',
          text: result.message,
          timestamp: new Date()
        }
        messages.value.push(assistantMessage)
      }
    }
  } catch (error) {
    console.error('Error sending message:', error)
    const errorMessage = {
      type: 'assistant',
      text: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
  }

}
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>

