<template>
  <div v-for="message in messages" :key="message.id" :class="message.isSent ? 'sent' : 'received'">
    <div class="message-container">
        <div class="message-content">
          {{message.text}}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['messages'],
}

</script>

<style scoped>

.message-container {
  padding: 10px;
  max-height: 425px;
  overflow-y: auto;
}

.sent {
  background-color: #d3fca8;
  max-width: 60%;
  width: max-content;
  margin: 10px 8px 5px auto;
  border-radius: 10px;
  word-wrap: break-word;
  white-space: pre-line;
}

.received {
  background-color: #ffffff;
  max-width: 60%;
  width: max-content;
  margin: 10px auto 5px 8px;
  border-radius: 10px;
  word-wrap: break-word;
  white-space: pre-line;
}

</style>