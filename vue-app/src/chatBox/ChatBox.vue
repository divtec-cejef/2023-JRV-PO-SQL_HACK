<template>
  <div class="chat-container">
  <div class="banner">
    <img src="../img/TeteLiam.png" alt="Photo de liam" class="interlocuteur-photo" />
    <div class="interlocuteur-info">
      <h2>John Doe</h2>
    </div>
  </div>
</div>
  <div>
    <div class="message-input">
      <textarea v-model="newMessage" rows="1" placeholder="Saisissez votre message" class="message-text" id="message-text" @keydown.enter.prevent="send"></textarea>
      <button @click="send" class="send-button" id="send-button">
        <img src="../img/icone_send_message.png" height="20" width="20"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sendMessage'],
  data() {
    return {
      newMessage: ''
    }
  },
  methods: {
    /**
     * Envoie du message dans la messagerie
     */
    send() {
      const textarea = document.getElementById("message-text");
      textarea.disabled = true;
      setTimeout(() => {
        textarea.disabled = false;
      }, 3000);

      this.newMessage = textarea.value;
      if (this.newMessage.trim() !== '') {
        // Appelez la méthode sendMessage passée en prop depuis le composant parent
        this.sendMessage(this.newMessage);
        // Réinitialisez le champ de texte après l'envoi
        this.newMessage = '';
      }
    }
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  position: fixed;
  top: 695px;
  width: 400px;
  border-top: black 1px solid;
}

.message-text {
  flex-grow: 1;
  resize: none;
  border: none;
  padding: 10px 5px 10px 5px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  text-align: left;
  font-size: 15px;
  overflow: hidden;
  height: auto;
}

.send-button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;

}
.banner {
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: black;
  border-bottom: #cccccc 1px solid;
  border-top: #cccccc 1px solid;
  color: #fff;
  position: fixed;
  width: 390px;

}

.interlocuteur-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.interlocuteur-info h2 {
  font-size: 18px;
  margin: 0;
}

.chat-container{
  margin-bottom: 70px;
}
</style>