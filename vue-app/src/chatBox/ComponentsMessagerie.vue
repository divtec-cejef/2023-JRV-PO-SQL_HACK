<template>
  <div class="onglet-telephone">
    <div class="barre-onglet">
      <div class="nomAppMessagerie">Messagerie</div>
      <div class="minus_square_plus">
        <button><img src="../assets/icon/moins.png" alt="" class="minus"></button>
        <button><img src="../assets/icon/carre.png" alt="" class="square"></button>
        <button @click="close" ><img src="../assets/icon/traverser.png" alt="" class="close"></button>
      </div>
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
import { dupontPlace } from "../../public/DB/DataBase";

const etape = ref(1);
const valeur = ref()

const messages = ref([
  { text: "Envoie-moi le mot de passe de l'alarme.", id: 1, isSent: false, },
  { text: "C'est la date de naissance de Martin Dupont.", id: 2, isSent: false },
  { text: "Aide toi de Selectionner.", id: 2, isSent: false },
]);

const messagesVoleur = ref([
  { text: "Parfait, c'est bien le bon mot de passe.", id: 3, isSent: false },
  { text: "Sérieux, qu'est-ce que tu as fait ? Tu veux vraiment que je finisse par me faire arrêter ? Donne-moi le bon code maintenant, sinon je vais me faire arrêter par la police.", id: 4, isSent: false },
  { text: "Pour commencer, Sélectionne le propriétaire de la tesla de couleur noire", id: 5, isSent: false },
  { text: "Donne-moi le propriétaire.", id: 6, isSent: false },
  { text: "Parfait, c'est bien la bonne personne.", id: 7, isSent: false },
  { text: "Absolument pas, je le connais.", id: 8, isSent: false },
  { text: "Donne-moi son ID", id: 9, isSent: false },
  { text: "Excellent, c'est le bon", id: 10, isSent: false },
  { text: "Tu as besoin de lunettes, mon pauvre ami. Allez donne moi le bon.", id: 11, isSent: false },
  { text: "Maintenant tu dois modifier le propriétaire de cette voiture", id: 12, isSent: false },
  { text: 'Mets-la au nom de "John Doe"', id: 13, isSent: false },
  { text: 'Et envoie "OK" quand tu as modifié le propriétaire', id: 14, isSent: false },
  { text: "Excellent, tu as bien réussi. Maintenant je peux m'en aller avec.", id: 15, isSent: false },
  { text: "Si j'essaie de partir avec ça va mal finir. Alors, ne joue pas au malin et change de propriétaire.", id: 16, isSent: false },
  { text: "En partant, j'ai voler une batterie.", id: 17, isSent: false },
  { text: "Alors, débrouille toi pour supprimer la batterie de la base de données", id: 18, isSent: false },
  { text: 'Et envoie "OK" quand tu as supprimé la batterie', id: 19, isSent: false },
  { text: "T'es le meilleur hackeur de tout mon répertoire Whatsapp !", id: 20, isSent: false },
  { text: "T'es le plus nul hackeur de tout mon répertoire Whatsapp !", id: 21, isSent: false },


]);

const emits = defineEmits(['close-chatbox','cinematiqueFin','jeu', "cinematiqueFinNiv2"]);

/**
 * emet false donc on affiche pas la fenetre
 */
function close(){
  emits('close-chatbox', true)
}

/**
 * Envoie le message
 * @param newMessageText Text du message que l'utilisateur à écrits
 */
function sendMessage(newMessageText) {
  const newMessage = {
    text: newMessageText,
    id: messages.value.length + 1,
    isSent: true,

  };

  messages.value.push(newMessage);
  setTimeout(() => {
    scrollToBottom();
  }, 10);
  VerifEtapeEnCours(newMessageText);
}

/**
 * Pousse un message apres un certain timing
 * @param Temps timing
 * @param idMess id du message
 */
function EnvoyerMessAvecTiming(Temps,idMess){
  setTimeout(() => {
    messages.value.push(messagesVoleur.value[idMess]);
  }, Temps);
}

/**
 * Scroll vers le dernier message Apres un certain timing
 * @param Temps Le timing
 */
function scrollToBottom(Temps){
  setTimeout(() => {
    const messageContainer = document.querySelector('.chat');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, Temps);
}

/**
 * Ouverture de la base de données et Select tout
 * @param NomTable Nom de la table choisis
 */
function OuvrirBaseDonnes(NomTable) {
  return new Promise((resolve) => {
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction([NomTable], "readonly");
      let objectStore = transaction.objectStore(NomTable);
      let request = objectStore.getAll();

      request.onsuccess = (event) => {
        let data = event.target.result;
        resolve(data);
      };
    };
  });
}

/**
 * Trouve l'id du propriete de la tesla noire
 */
function TrouveIDProprietaire() {
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction(["tb_voiture"], "readonly");
      let objectStore = transaction.objectStore("tb_voiture");
      let request = objectStore.getAll();
      let iDup = 0;
      request.onsuccess = (event) => {
        let data = event.target.result;
        let dupontPlacev2 = 30;
        if (dupontPlace > 20) {
          iDup = dupontPlace - 20;
          dupontPlacev2 = dupontPlace + 20;
        } else if (dupontPlace > 470) {
          iDup = 450;
          dupontPlacev2 = 500;
        }
        for (let i = iDup; i < dupontPlacev2; i++) {
          if (data[i].couleur === "Noire") {
            iDup = i;
          }
        }
        resolve(iDup);
      }
    }

    request.onerror = (event) => {
      reject(event.target.error);
    }
  });
}

/**
 * Verifie l'étape en cours et repond en fonction de l'étape
 * @param newMessageText Text écrit par l'utilisateur
 */
function VerifEtapeEnCours(newMessageText) {

//Verification date de naissance
  if (etape.value === 1) {
    if (newMessageText === '1986-04-26' || newMessageText === '26-04-1986') {
      //on ajoute un message après 1,5 seconde
      EnvoyerMessAvecTiming(1500, 0);
      // Passage à l'étape suivante
      etape.value = etape.value + 1;

      // Ajout d'autre message en plusieur timing
      EnvoyerMessAvecTiming(2500, 2);
      EnvoyerMessAvecTiming(3500, 3);
      scrollToBottom(3510);
    } else {
      // Si la date n'est correcte, on ajoute un message différent après 1,5 seconde
      EnvoyerMessAvecTiming(1500, 1);
      // Fait défiler vers le bas après 1,51 secondes
      scrollToBottom(1510);
    }

    //verification REJOME VIRAL
  } else if (etape.value === 2) {
    if (newMessageText.toLowerCase() === 'rejome viral') {
      // Si le nom est juste, on ajoute un message
      EnvoyerMessAvecTiming(1500, 4);
      scrollToBottom(1510);

      // Passage à l'étape suivante
      etape.value = etape.value + 1;

      // Ajout d'un autre message
      EnvoyerMessAvecTiming(2500, 6);
      scrollToBottom(2510);

    } else {
      // Si le nom est faux, on ajoute un message différent
      EnvoyerMessAvecTiming(1500, 5);
      scrollToBottom(1510);
    }


    //Verification de l'id de rejome viral
  } else if (etape.value === 3) {
    TrouveIDProprietaire().then((idDupont) => {
      if (newMessageText.toString() === (idDupont + 1).toString()) {
        EnvoyerMessAvecTiming(1500, 7);
        scrollToBottom(1510);
        EnvoyerMessAvecTiming(2500, 9);
        scrollToBottom(2510);
        EnvoyerMessAvecTiming(3000, 10);
        scrollToBottom(3010);
        EnvoyerMessAvecTiming(3500, 11);
        scrollToBottom(3510);
        etape.value = etape.value + 1;
      } else {
        // Si le message n'est pas "OK", on ajoute un message différent après 1,5 seconde
        EnvoyerMessAvecTiming(1500, 8);
        scrollToBottom(1510);
      }
    })

    //Verification si la modication a eu lieu et si elle est juste
  }else if (etape.value === 4) {

    if (newMessageText.toLowerCase() === 'ok') {
      TrouveIDProprietaire().then((idDupont) => {
        OuvrirBaseDonnes("tb_voiture").then((data) => {
          if (data[idDupont].proprietaire === "John Doe") {
            EnvoyerMessAvecTiming(1500, 12);
            scrollToBottom(1510);
            etape.value = etape.value + 1;
            setTimeout(() => {
              emits('cinematiqueFin', true);
              EnvoyerMessAvecTiming(3000, 14);
              EnvoyerMessAvecTiming(3000, 15);
              EnvoyerMessAvecTiming(3000, 16);
              scrollToBottom(3010);
            }, 3500);
            scrollToBottom(2510);
          } else {
            EnvoyerMessAvecTiming(1500, 13);
            scrollToBottom(1510);
          }
        })
      })
    }else{
      EnvoyerMessAvecTiming(1500, 13);
      scrollToBottom(1510);
    }


    //2eme Niveau et verifie si la supression est faites
  }else if (etape.value === 5) {

    if (newMessageText.toLowerCase() === 'ok') {
      OuvrirBaseDonnes("tb_materiel").then((data) => {
        if (data[16].nom_materiel === "Chalumeau") {
          EnvoyerMessAvecTiming(1500, 17);
          scrollToBottom(1510);
          etape.value = etape.value + 1;
          setTimeout(() => {
            emits("cinematiqueFinNiv2", true);
          }, 3000);
        }else{
          EnvoyerMessAvecTiming(1500, 18);
          scrollToBottom(1510);
        }
      })
    }else{
      EnvoyerMessAvecTiming(1500, 18);
      scrollToBottom(1510);
    }
  }
}

onMounted(() => {
  scrollToBottom();
});

</script>


<style>

.onglet-telephone {
  position: relative;
  width: 400px;
  height: 578px;
  border: 3px solid white;
  box-shadow: 5px 5px 5px black;
  display: flex;
  flex-direction: column;
}

.barre-onglet {
  height: 30px;
  background-color: #222222;
  border-bottom: 1px solid white;
  display: flex;
  padding-top: 3px;
  justify-content: space-between;
}

.barre-onglet button {
  background-color: transparent;
  border: none;
}

.message {
  margin: 5px;
  max-width: 70%;
  display: flex;
  justify-content: flex-start;
}

.chat{
  width: 100%;
  max-height: 489px;
  overflow-y: auto;
  background-image: url('@/img/Fond_ecran_wattsap.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
}

.minus, .close{
  height: 20px;
  width: 20px;
}
.square {
  height: 15px;
  width: 15px;
  margin-bottom: 2px;
}
.square:hover, .minus:hover, .close:hover {
  transform: scale(1.1);
  background-color: #28282f;
}
.square:hover {
  transform: scale(1.05);
}
.nomAppMessagerie {
  color: white;
  font-family: 'Jura', sans-serif;
  font-size: 22px;
  padding-left: 10px;
}
.minus_square_plus {
  margin-top: 2px;
}
</style>