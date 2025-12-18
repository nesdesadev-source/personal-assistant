<template>
  <div class="chat-input-container">
    <form @submit.prevent="handleSubmit" class="chat-input-form">
      <input
        v-model="localMessage"
        type="text"
        placeholder="Type your message..."
        class="chat-input"
        :disabled="isLoading"
        @input="handleInput"
      />
      <button 
        type="submit" 
        class="send-button"
        :disabled="!localMessage.trim() || isLoading"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send-message'])

const localMessage = ref('')

const handleInput = () => {
  emit('input', localMessage.value)
}

const handleSubmit = () => {
  if (!localMessage.value.trim() || props.isLoading) return
  
  emit('send-message', localMessage.value.trim())
  localMessage.value = ''
}

const clearInput = () => {
  localMessage.value = ''
}

defineExpose({
  clearInput
})
</script>

<style scoped>
.chat-input-container {
  padding: 1.5rem 2rem;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.chat-input-form {
  display: flex;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-input {
  flex: 1;
  padding: 0.875rem 1.125rem;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #646cff;
}

.chat-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-button {
  padding: 0.875rem 1.25rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  background: #535bf2;
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
