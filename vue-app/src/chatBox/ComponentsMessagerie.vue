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

  const etape = ref(1);
  const showComponent = ref(true);
  const valeur = ref()

  const messages = ref([
  { text: "Envoie-moi le mot de passe de l'alarme.", id: 1, isSent: false, },
  { text: "C'est la date de naissance de Martin Dupont.", id: 2, isSent: false },
  ]);
  
  const messagesVoleur = ref([
    { text: "Parfait, c'est bien le bon code.", id: 3, isSent: false },
    { text: "Sérieux, qu'est-ce que tu as fait ? Tu veux vraiment que je finisse par me faire arrêter ? Donne-moi le bon code maintenant, sinon je vais me faire arrêter par la police.", id: 4, isSent: false },
    { text: "Pour commencer, Sélectionne le propriétaire de la tesla de couleur noire", id: 5, isSent: false },
    { text: "Donne-moi son nom et son prénom.", id: 6, isSent: false },
    { text: "Parfait, c'est bien la bonne personne.", id: 7, isSent: false },
    { text: "Absolument pas, je le connais.", id: 8, isSent: false },
    { text: "Donne-moi son ID", id: 9, isSent: false },
    { text: "Excellent, c'est le bon", id: 10, isSent: false },
    { text: "Tu as besoin de lunettes, mon pauvre ami", id: 11, isSent: false },
    { text: "Maintenant tu dois changer le propriétaire de cette voiture", id: 12, isSent: false },
    { text: 'Mets-la au nom de "John Doe"', id: 13, isSent: false },
    { text: 'Et envoie "OK" quand tu as modifié le propriétaire', id: 14, isSent: false },
    { text: "Excellent, tu as bien réussi. Maintenant je peux m'en aller avec.", id: 15, isSent: false },
    { text: "Si j'essaie de partir avec ça va mal finir. Alors, ne joue pas au malin et change de propriétaire.", id: 16, isSent: false },


  ]);
  const DupontPlace = ref(0);
  const emits = defineEmits(['close-chatbox','cinematiqueFin']);

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

// Vérification de l'étape en cours
    if (etape.value === 1) {
      // Si l'étape est 1, on vérifie le contenu du message
      if (newMessageText === '1986-04-26' || newMessageText === '26-04-1986') {
        // Si le message est une date valide, on ajoute un message après 1,5 seconde
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[0]);
        }, 1500);

        // Passage à l'étape suivante
        etape.value = etape.value + 1;

        // Ajout d'un autre message après 2,5 secondes
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[2]);
        }, 2500);

        setTimeout(() => {
          messages.value.push(messagesVoleur.value[3]);
        }, 3500);

        // Fait défiler vers le bas après 2,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 3510);
      } else {
        // Si le message n'est pas une date valide, on ajoute un message différent après 1,5 seconde
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[1]);
        }, 1500);

        // Fait défiler vers le bas après 1,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 1510);
      }
    } else if (etape.value === 2) {
      // Si l'étape est 2, on vérifie le contenu du message
      if (newMessageText.toLowerCase() === 'rejome viral') {
        // Si le message correspond, on ajoute un message après 1,5 seconde
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[4]);
        }, 1500);

        // Fait défiler vers le bas après 1,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 1510);

        // Passage à l'étape suivante
        etape.value = etape.value + 1;

        // Ajout d'un autre message après 2,5 secondes
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[6]);
        }, 2500);

        // Fait défiler vers le bas après 2,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 2510);
      } else {
        // Si le message ne correspond pas, on ajoute un message différent après 1,5 seconde
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[5]);
        }, 1500);

        // Fait défiler vers le bas après 1,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 1510);
      }
    }else if (etape.value === 3){
      let request = window.indexedDB.open("maBaseDeDonnees");

      request.onsuccess = (event) => {
        let db = event.target.result;
        let transaction = db.transaction(["tb_voiture"], "readonly");
        let objectStore = transaction.objectStore("tb_voiture");
        let request = objectStore.getAll();

        request.onsuccess = (event) => {
          let data = event.target.result;
          let idDupont = 0;
          let iDup = dupontPlace - 50;
          console.log("idup = " + iDup)

          for (let i = iDup; i < iDup + 100; i++) {
            if (data[i].couleur === "Noire") {
              idDupont = i+1;
              console.log(idDupont)
            }
          }
          console.log(idDupont +  "WARRRR")
          console.log(newMessage.text);
          if (newMessage.text === idDupont.toString()) {
            setTimeout(() => {
              messages.value.push(messagesVoleur.value[7]);
            }, 1500);
            setTimeout(() => {
              scrollToBottom();
            }, 1510);
            setTimeout(() => {
              messages.value.push(messagesVoleur.value[9]);
            }, 2500);
            setTimeout(() => {
              scrollToBottom();
            }, 2510);
            setTimeout(() => {
              messages.value.push(messagesVoleur.value[10]);
            }, 3000);
            setTimeout(() => {
              scrollToBottom();
            }, 3010);
            setTimeout(() => {
              messages.value.push(messagesVoleur.value[11]);
            }, 3500);
            setTimeout(() => {
              scrollToBottom();
            }, 3510);
            etape.value = etape.value + 1;
          } else {
            // Si le message n'est pas "OK", on ajoute un message différent après 1,5 seconde
            setTimeout(() => {
              messages.value.push(messagesVoleur.value[8]);
            }, 1500);

            // Fait défiler vers le bas après 1,51 secondes
            setTimeout(() => {
              scrollToBottom();
            }, 1510);
          }
        }
      }
    }else if (etape.value === 4) {
      // Si l'étape est 3, on vérifie le contenu du message
      if (newMessageText.toLowerCase() === 'ok') {
        // Si le message est "OK", on effectue des opérations supplémentaires
        console.log("OKEY")
        let request = window.indexedDB.open("maBaseDeDonnees");

        request.onsuccess = (event) => {
          let db = event.target.result;
          let transaction = db.transaction(["tb_voiture"], "readonly");
          let objectStore = transaction.objectStore("tb_voiture");
          let request = objectStore.getAll();

          request.onsuccess = (event) => {
            let data = event.target.result;
            let idDupont = 0;
            let iDup = dupontPlace - 50;
            console.log("idup = " + iDup)
            for (let i = iDup; i < iDup + 100; i++) {
              console.log(data[i].proprietaire);
              if (data[i].couleur === "Noire") {
                idDupont = i;
              }
            }
            console.log(data[idDupont].proprietaire);
            if (data[idDupont].proprietaire === "John Doe") {
              setTimeout(() => {
                messages.value.push(messagesVoleur.value[12]);
              }, 1500);
              setTimeout(() => {
                scrollToBottom();
              }, 1510);
              etape.value = etape.value + 1;

              setTimeout( () =>{
                emits('cinematiqueFin', true);
              }, 2500);
            } else {
              // Si le message n'est pas "OK", on ajoute un message différent après 1,5 seconde
              setTimeout(() => {
                messages.value.push(messagesVoleur.value[13]);
              }, 1500);

              // Fait défiler vers le bas après 1,51 secondes
              setTimeout(() => {
                scrollToBottom();
              }, 1510);
            }
          }
        }
      }else{
        // Si le message n'est pas "OK", on ajoute un message différent après 1,5 seconde
        setTimeout(() => {
          messages.value.push(messagesVoleur.value[13]);
        }, 1500);

        // Fait défiler vers le bas après 1,51 secondes
        setTimeout(() => {
          scrollToBottom();
        }, 1510);
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
  border: 3px solid white;
  box-shadow: 5px 5px 5px black;
  display: flex; /* Utilisez l'affichage flex */
  flex-direction: column; /* Les éléments flex s'étendront verticalement */
}

.barre-onglet {
  //padding: 5px;
  //margin: 5px;
  height: 30px;
  background-color: #cccccc;
  border-bottom: 1px solid white;
  display: flex;
  padding-top: 3px;
  justify-content: flex-end;
}

.barre-onglet button {
  background-color: transparent;
  border: none;
  padding: 0 10px 0 5px;
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
  background-image: url('@/img/Fond_ecran_wattsap.png');
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