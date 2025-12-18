<template>
  <main class="chat-area">
    <div class="chat-container">
      <MessagesContainer 
        ref="messagesContainerRef"
        :messages="messages"
      />
      <ChatInput 
        :is-loading="isLoading"
        @send-message="handleSendMessage"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import MessagesContainer from './MessagesContainer.vue'
import ChatInput from './ChatInput.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send-message'])

const messagesContainerRef = ref(null)

const handleSendMessage = (messageText) => {
  emit('send-message', messageText)
  if (messagesContainerRef.value) {
    messagesContainerRef.value.scrollToBottom()
  }
}
</script>

<style scoped>
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  overflow: hidden;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
}
</style>
