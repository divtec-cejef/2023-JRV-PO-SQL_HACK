<script setup>

import CinématiqueBulle from "@/pages/cinématique/cinématique-bulle.vue";
import {ref} from "vue";
const message= ref("Salut, hacker ! Aide moi à voler la Tesla de couleur noir dans le garage derrière moi.")
const listeTexte = ["Pour entrer, il faut que tu trouves le mot de passe de l’alarme. Il me semble que c’est la date de naissance du patron. Il s'appelle Martin Dupont.",
"Tu dois créer une requête SELECT qui permettra de rechercher dans la base de données la date de naissance du patron.",
"Dans l’écran suivant tu trouveras un constructeur sur ta gauche qui te permettra de construire ta requête."]
var questionActuelle = 0
const emits = defineEmits(['changement-ecran'])


function nextText(){
  if (listeTexte.length < questionActuelle + 1){
    emits('changement-ecran', true)
  } else {
    message.value = listeTexte[questionActuelle]
    questionActuelle++
  }
}

</script>

<template>


    <img src="../../img/VuGarage.jpg" id="image_de_fond" alt="" >
    <img src="../../img/personnage.png" id="personnage" alt="">
    <div id="message"> {{ message }}</div>








<!--  <div class="texte-bulle">-->
<!--    <cinématique-bulle :message="message"></cinématique-bulle>-->
<!--  </div>-->

  <button class="btnContinuer" @click="nextText">Continuer</button>

<!--  <RouterLink to="/">retour</RouterLink>-->


</template>

<style scoped>


* {
  margin: 0;
}

img {
  width: 100%;
  height: 100%;
}

#image-fond{

}

#personnage{
  width: auto;
  height: 900px;
  position: fixed;
  left: 200px;
  top: 200px;
  bottom: 0;
  z-index: 3;
}

 .btnContinuer{
   position: fixed;
   bottom: 100px;
   right: 100px;
   color: #FFFFFF;
   background-color: #000000;
   width: 15%;
   height: 70px;
   border: none;
   font-size: 38px;
   font-weight: bold;
   border-radius: 20px;
   transition: transform 500ms ease;
   z-index: 3;
 }

 .btnContinuer:hover{
   transform: scale(1.1);
 }
 #message {
   color: white;
   font-size: 64px;
   left: 600px;
   top: 150px ;
   z-index: 5;
   position: fixed;
 }
 #image_de_fond {
   /* Fixe l'image en haut à gauche de la page */
   position: fixed;
   top: 0;
   left: 0;
   /* Préserve le ratio de l'image */
   min-width: 100%;
   min-height: 100%;
   filter: brightness(0.45); /* Réduit la luminosité à 50% (plus sombre) */
   z-index: 3;
 }

</style>