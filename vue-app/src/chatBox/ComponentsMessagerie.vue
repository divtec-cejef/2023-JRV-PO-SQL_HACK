<template>
 <div class="onglet-telephone">
   <div class="barre-onglet">
     <button><img src="../assets/icon/minus.png" alt="" class="minus"></button>
     <button><img src="../assets/icon/square.png" alt="" class="square"></button>
     <button @click="close" ><img src="../assets/icon/close.png" alt="" class="close"></button>
   </div>
    <div class="chat">
    <ChatBox :sendMessage="sendMessage" />
    <MessageList :messages="messages"  class="message" />
    </div>
 </div>
</template>


<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import MessageList from "@/chatBox/MessageList.vue";
  import ChatBox from "@/chatBox/ChatBox.vue";
  import { dupontPlace } from "@/DB/DataBase";

  const showComponent = ref(true);
  const messages = ref([
  { text: "Envoie-moi le mot de passe de l'alarme. C'est la date de naissance de Martin Dupont.", id: 1, isSent: false },
  ]);

  const messagesVoleur = ref([
  { text: "Parfait, c'est bien la bonne personne.", id: 2, isSent: false },
  { text: "Sérieux, qu'est-ce que tu as fait ? Tu veux vraiment que je finisse par me faire arrêter ? Donne-moi le bon code maintenant, sinon je vais me faire arrêter par la police.", id: 3, isSent: false },
  { text: "À présent, modifie le propriétaire de la Tesla noire en la mettant à mon nom, John Doe. Pour commencer, Sélectionne le propriétaire de la voiture qui a une couleur noire, donne-moi son nom et son prénom et mémorise son ID.", id: 4, isSent: false },
  { text: "Parfait, c'est bien la bonne personne.", id: 5, isSent: false },
  { text: "Absolument pas, je le connais.", id: 6, isSent: false },
  { text: "Mémorise son ID. Modifie le propriétaire de la voiture au nom de John Doe grâce à 'ID' que tu as mémorisé. Quand tu as fini, vérifie si le proprio à bien changer et envoie-moi 'OK'", id: 7, isSent: false },
  { text: "Excellent, tu as bien réussi. Maintenant je peux m'en aller avec.", id: 8, isSent: false },
  { text: "Si j'essaie de partir avec ça va mal finir. Alors, ne joue pas au malin et change de propriétaire.", id: 9, isSent: false },
  ]);

  const etape = ref(1);
  const DupontPlace = ref(0);
  const emits = defineEmits(['close-chatbox']);

  function close(){
    // emet false donc on affiche pas la fenetre
    emits('close-chatbox', true)
  }

  const sendMessage = (newMessageText) => {
  const newMessage = {
  text: newMessageText,
  id: messages.value.length + 1, // Assurez-vous que l'ID est unique
  isSent: true,

};

  messages.value.push(newMessage);
  setTimeout(() => {
  scrollToBottom();
}, 10);

  if (etape.value === 1) {
  if (newMessageText === '1986-04-26' || newMessageText === '26-04-1986') {
  messages.value.push(messagesVoleur.value[0]);
  etape.value = etape.value + 1;
  setTimeout(() => {
  messages.value.push(messagesVoleur.value[2]);
}, 2000);
  setTimeout(() => {
  scrollToBottom();
}, 2010);
} else {
  messages.value.push(messagesVoleur.value[1]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
}
} else if (etape.value === 2) {
  if (newMessageText === 'Rejome Viral') {
  messages.value.push(messagesVoleur.value[3]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
  etape.value = etape.value + 1;

  setTimeout(() => {
  messages.value.push(messagesVoleur.value[5]);
}, 2000);
  setTimeout(() => {
  scrollToBottom();
}, 2010);
} else {
  messages.value.push(messagesVoleur.value[4]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
}
} else if (etape.value === 3) {
  if (newMessageText === 'OK') {
  DupontPlace.value = dupontPlace;
  console.log(DupontPlace.value + "compar");

  let request = window.indexedDB.open("maBaseDeDonnees");

  request.onsuccess = (event) => {
  let db = event.target.result;
  let transaction = db.transaction(["tb_voiture"], "readonly");
  let objectStore = transaction.objectStore("tb_voiture");
  let request = objectStore.getAll();

  request.onsuccess = (event) => {
  let data = event.target.result;
  console.log(data[DupontPlace.value].proprietaire);
  if (data[DupontPlace.value].proprietaire === "John Doe") {
  messages.value.push(messagesVoleur.value[6]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
  etape.value = etape.value + 1;
} else {
  messages.value.push(messagesVoleur.value[7]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
}
};
};
} else {
  messages.value.push(messagesVoleur.value[7]);
  setTimeout(() => {
  scrollToBottom();
}, 10);
}
}
};

  const scrollToBottom = () => {
  const messageContainer = document.querySelector('.chat');
  if (messageContainer) {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
};

  onMounted(() => {
  scrollToBottom();
});

  onBeforeUnmount(() => {
  // Nettoyer les ressources, les gestionnaires d'événements, etc. si nécessaire
});

</script>


<style>
/* Styles pour l'iPhone 11 */
.onglet-telephone {
  position: relative;
  width: 400px;
  height: 578px;
  //background-color: #fff;
  //border: 7px solid #000;
  //border-radius: 30px;
  //overflow: hidden;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  //border-top: 4px solid #cccccc;
  //border-radius: 10px;
  box-shadow: 5px 5px 5px black;
  display: flex; /* Utilisez l'affichage flex */
  flex-direction: column; /* Les éléments flex s'étendront verticalement */
}

.barre-onglet {
  //padding: 5px;
  //margin: 5px;
  height: 30px;
  background-color: #cccccc;
  display: flex;
  padding-top: 3px;
  justify-content: flex-end;
}

.barre-onglet button {
  background-color: transparent;
  border: none;
}

/* Barre supérieure */
.iphone-11::before {
  //content: "";
  //position: absolute;
  //top: 0;
  //left: 0;
  //right: 0;
  //height: 42px;
  //background-color: #000;
}

.iphone-11::after {
  //content: "";
  //position: absolute;
  //bottom: 0;
  //left: 0;
  //right: 0;
  //height: 42px;
  //background-color: #000;
}


.message {
  margin: 5px;
  max-width: 70%; /* Limite la largeur des messages pour éviter qu'ils ne s'étendent trop */
  display: flex; /* Utilisez l'affichage flex pour inverser l'alignement */
  justify-content: flex-start; /* Inverse l'alignement horizontal */
}

.chat{
  //flex: 1; /* Faites en sorte que .chat utilise tout l'espace vertical disponible */
  width: 100%; /* Utilisez toute la largeur disponible */
  max-height: 489px; /* Hauteur maximale pour la liste de messages, ajustez selon vos besoins */
  overflow-y: auto; /* Affiche une barre de défilement en cas de dépassement de la hauteur maximale */
  background-image: url('@/img/watsapp.png');
  background-size: cover; /* Pour redimensionner l'image pour qu'elle couvre tout le conteneur */
  background-repeat: no-repeat; /* Pour éviter que l'image ne se répète */
  background-position: center center; /* Pour centrer l'image horizontalement et verticalement */
  /* Autres styles de votre conteneur */
  height: 100%; /* Définissez la hauteur souhaitée */
}

.minus, .square, .close{
 height: 20px;
  width: 20px;
}

</style>