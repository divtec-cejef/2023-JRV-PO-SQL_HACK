<script setup>

import CinématiqueBulle from "@/pages/cinématique/cinématique-bulle.vue";
import {onMounted, ref} from "vue";
const message = ref()
const listeTexte = ["Dans l'écran suivant tu trouveras des indications sur ta gauche et un écran d'ordinateur sur ta droite.",
"Tu vas devoir créer des requêtes SQL pour récupérer des informations dans la base de données et me les envoyer par message.",
"Pour commencer, regarde la vidéo de tutoriel pour t'aider à comprendre."]
var questionActuelle = 0
const emits = defineEmits(['changement-ecran'])
let disabledBtnContinuer = ref()

const effetLettres = async (inputText) => {
    for (const letter of inputText) {
      message.value += letter;
      await new Promise(resolve => setTimeout(resolve, 20));
      disabledBtnContinuer.value = true
    }
    disabledBtnContinuer.value = false
}
function nextText(){
  if (listeTexte.length < questionActuelle + 1){
    emits('changement-ecran', true)
  } else {
    message.value = ""
    disabledBtnContinuer.value = true
    effetLettres(listeTexte[questionActuelle].toString());
    questionActuelle++
  }
}

onMounted(() => {
  message.value = ""
  let message_debut = "Salut hacker ! Aide moi à voler la Tesla de couleur noire dans le garage derrière moi.";
  effetLettres(message_debut);
  questionActuelle++
});

</script>

<template>


    <img src="../../img/VuGarage.jpg" id="image_de_fond" alt=""  @keydown.enter="nextText">
    <img src="../../img/personnage.png" id="personnage" alt="">
    <textarea id="message" :value="message" readonly></textarea>

    <div id="barre"></div>
    <button class="btnContinuer" @click="nextText" :disabled="disabledBtnContinuer">Continuer</button>


</template>

<style scoped>

@keyframes apparitionLettre {
  0% {
    opacity: 0;
    transform: translateY(1em);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

* {
  margin: 0;
}

img {
  width: 100%;
  height: 100%;
}

 .btnContinuer{
   position: fixed;
   bottom: 100px;
   right: 100px;
   color: #FFFFFF;
   background-color: #000000;
   width: 15%;
   height: 70px;
   border: 2px solid white;
   font-size: 38px;
   font-weight: bold;
   border-radius: 20px;
   transition: transform 500ms ease;
   z-index: 3;
 }

 .btnContinuer:hover{
   transform: scale(1.1);
 }

#personnage{
  width: auto;
  height: 1100px;
  position: fixed;
  left: 180px;
  top: 200px;
  bottom: 0;
  z-index: 3;
}

 #message {
   color: white;
   font-size: 60px;
   left: 680px;
   top: 200px;
   width: 1000px;
   height: 400px;
   z-index: 5;
   resize: none;
   border: none;
   background-color: transparent;
   margin-right: 30px;
   position: fixed;

 }

#message:focus{
  border: none;
  outline: none;
  user-select: none;
}

 #image_de_fond {
   /* Fixe l'image en haut à gauche de la page */
   position: fixed;
   top: 0;
   left: 0;
   /* Préserve le ratio de l'image */
   min-width: 100%;
   min-height: 100%;
   filter: brightness(0.2); /* Réduit la luminosité à 50% (plus sombre) */
   z-index: 3;
}

</style>