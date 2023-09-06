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
import {dupontPlace} from "@/DB/DataBase";

export default {
  components: { MessageList, ChatBox },
  data() {
    return {
      messages: [
        { text: "Envoie-moi le mot de passe de l'alarme. C'est la date de naissance de Martin Dupont.", id: 1, isSent: false },
      ],
      messagesVoleur: [
        { text: "Parfait, c'est bien la bonne personne.", id: 2, isSent: false },
        { text: "Sérieux, qu'est-ce que tu as fait ? Tu veux vraiment que je finisse par me faire arrêter ? Donne-moi le bon code maintenant, sinon je vais me faire arrêter par la police.", id: 3, isSent: false },
        { text: "À présent, modifie le propriétaire de la Tesla noire en la mettant à mon nom, John Doe. Pour commencer, Sélectionne le propriétaire de la voiture qui a une couleur noire, donne-moi son nom et son prénom et mémorise son ID.", id: 4, isSent: false },
        { text: "Parfait, c'est bien la bonne personne.", id: 5, isSent: false },
        { text: "Absolument pas, je le connais.", id: 6, isSent: false },
        { text: "Mémorise son ID. Modifie le propriétaire de la voiture au nom de John Doe grâce à 'ID' que tu as mémorisé. Quand tu as fini, vérifie si le proprio à bien changer et envoie-moi 'OK'", id: 7, isSent: false },
        { text: "Excellent, tu as bien réussi. Maintenant je peux m'en aller avec.", id: 8, isSent: false },
        { text: "Si j'essaie de partir avec ça va mal finir. Alors, ne joue pas au malin et change de propriétaire.", id: 9, isSent: false },
      ],
      etape: 1,
      DupontPlace: 0
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

      if (this.etape === 1){
        if (newMessageText === '1986-04-26' || newMessageText === '26-04-1986') {
          this.messages.push(this.messagesVoleur[0]);
          this.etape = this.etape+1;
          setTimeout(() =>{
            this.messages.push(this.messagesVoleur[2]);
          }, 2000)
          setTimeout(() =>{
            this.scrollToBottom();
          }, 2010)
        } else {
          this.messages.push(this.messagesVoleur[1]);
          setTimeout(() => {
            this.scrollToBottom();
          }, 10);
        }
      } else if (this.etape === 2){
        if (newMessageText === 'Rejome Viral') {
          this.messages.push(this.messagesVoleur[3]);
          setTimeout(() => {
            this.scrollToBottom();
          }, 10);
          this.etape = this.etape+1;

          setTimeout(() =>{
            this.messages.push(this.messagesVoleur[5]);
          }, 2000)
          setTimeout(() => {
            this.scrollToBottom();
          }, 2010);
        } else {
          this.messages.push(this.messagesVoleur[4]);
          setTimeout(() => {
            this.scrollToBottom();
          }, 10);
        }
      } else if (this.etape === 3) {
        if (newMessageText === 'OK') {
          this.DupontPlace = dupontPlace;
          console.log(this.DupontPlace + "compar")
          // Ouverture de la base de données "maBaseDeDonnees"
          let request = window.indexedDB.open("maBaseDeDonnees");

          request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(["tb_voiture"], "readonly");
            let objectStore = transaction.objectStore("tb_voiture");
            let request = objectStore.getAll();

            request.onsuccess = (event) => {
              let data = event.target.result;
              console.log(data[this.DupontPlace].proprietaire);
              if (data[this.DupontPlace].proprietaire === "John Doe") {
                this.messages.push(this.messagesVoleur[6]);
                setTimeout(() => {
                  this.scrollToBottom();
                }, 10);
                this.etape = this.etape + 1;
              } else {
                this.messages.push(this.messagesVoleur[7]);
                setTimeout(() => {
                  this.scrollToBottom();
                }, 10);
              }
            };
          };
        } else {
          this.messages.push(this.messagesVoleur[7]);
          setTimeout(() => {
            this.scrollToBottom();
          }, 10);
        }
      }
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
  height: 100%; /* Définissez la hauteur souhaitée */
}
</style>