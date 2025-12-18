<template>
  <div :class="['message', `message-${message.type}`]">
    <div class="message-content">
      <div class="message-text">{{ message.text }}</div>
      <div class="message-time">{{ formatTime(message.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['user', 'assistant', 'system'].includes(value.type) &&
             typeof value.text === 'string' &&
             value.timestamp instanceof Date
    }
  }
})

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.message {
  display: flex;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-user {
  justify-content: flex-end;
}

.message-assistant {
  justify-content: flex-start;
}

.message-system {
  justify-content: center;
}

.message-content {
  max-width: 70%;
  min-width: 200px;
}

.message-user .message-content {
  max-width: 65%;
}

.message-assistant .message-content {
  max-width: 75%;
}

.message-system .message-content {
  max-width: 90%;
  text-align: center;
}

.message-text {
  padding: 0.875rem 1.125rem;
  border-radius: 12px;
  word-wrap: break-word;
  line-height: 1.6;
}

.message-user .message-text {
  background: #646cff;
  color: white;
  border-bottom-right-radius: 4px;
  margin-left: auto;
}

.message-assistant .message-text {
  background: white;
  color: #213547;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  font-size: 1rem;
  line-height: 1.7;
  max-width: 100%;
}

.message-system .message-text {
  background: #f0f0f0;
  color: #666;
  border: 1px solid #e0e0e0;
  font-size: 0.875rem;
  padding: 0.625rem 1rem;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.375rem;
  padding: 0 0.25rem;
}

.message-user .message-time {
  text-align: right;
}

.message-assistant .message-time {
  text-align: left;
}

.message-system .message-time {
  text-align: center;
}
</style>
