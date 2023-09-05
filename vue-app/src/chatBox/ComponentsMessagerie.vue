<template>
  <div class="iphone-11">
    <div class="camera"></div>
    <div class="chat">
      <ChatBox :sendMessage="sendMessage" />
    <MessageList :messages="messages"  class="message" />
    </div>
  </div>
</template>

<script>
import MessageList from "@/chatBox/MessageList.vue";
import ChatBox from "@/chatBox/ChatBox.vue";

export default {
  components: { MessageList, ChatBox },
  data() {
    return {
      messages: [
        { text: "Bonjour !", id: 1, isSent: false },
        { text: "Comment ça va ?", id: 2, isSent: false },
      ],
    };
  },
  methods: {
    sendMessage(newMessageText) {
      // Ajoutez la logique de gestion des messages ici
      // Par exemple, ajoutez le nouveau message à la liste des messages avec un nouvel ID
      const newMessage = {
        text: newMessageText,
        id: this.messages.length + 1, // Assurez-vous que l'ID est unique
        isSent: true,
      };
      // Appelez la méthode de défilement vers le bas
      this.messages.push(newMessage);
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);

    },
    scrollToBottom() {
      // Utilisez cette méthode pour effectuer le défilement vers le bas
      const messageContainer = document.querySelector('.chat');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;

      }
    },
  },
};
</script>

<style>
.message {
  margin: 5px;
  max-width: 70%; /* Limite la largeur des messages pour éviter qu'ils ne s'étendent trop */
  display: flex; /* Utilisez l'affichage flex pour inverser l'alignement */
  justify-content: flex-start; /* Inverse l'alignement horizontal */
}

.sent {
  background-color: #d3fca8; /* Vert pour les messages envoyés */
  justify-content: flex-end; /* Inverse l'alignement horizontal pour les messages envoyés */
}
/* Styles pour l'iPhone 11 */
.iphone-11 {
  position: relative;
  width: 300px;
  height: 600px;
  background-color: #fff;
  border: 7px solid #000;
  border-radius: 30px;
  overflow: hidden;
  display: flex; /* Utilisez l'affichage flex */
  flex-direction: column; /* Les éléments flex s'étendront verticalement */
}

/* Barre supérieure */
.iphone-11::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  background-color: #000;
}

.iphone-11::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 42px;
  background-color: #000;
}

/* Caméra */
.iphone-11 .camera {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
}
.chat{
  flex: 1; /* Faites en sorte que .chat utilise tout l'espace vertical disponible */
  width: 100%; /* Utilisez toute la largeur disponible */
  max-height: 444px; /* Hauteur maximale pour la liste de messages, ajustez selon vos besoins */
  overflow-y: auto; /* Affiche une barre de défilement en cas de dépassement de la hauteur maximale */
  background-image: url('@/img/watsapp.png');
  background-size: cover; /* Pour redimensionner l'image pour qu'elle couvre tout le conteneur */
  background-repeat: no-repeat; /* Pour éviter que l'image ne se répète */
  background-position: center center; /* Pour centrer l'image horizontalement et verticalement */
  /* Autres styles de votre conteneur */
  width: 100%;
  height: 100%; /* Définissez la hauteur souhaitée */
}
</style>