<script setup>
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Chat from "@/chatBox/chat.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
import BarreLaterale from "@/pages/barreLaterale/barre-laterale.vue";
import ComponentsMessagerie from "@/chatBox/ComponentsMessagerie.vue";
import {ref} from "vue";

let jeu = ref(false)
let cinematique = ref(true)
let cle = ref(0)
let afficherChatBox = ref(false)
let afficherConstructeur = ref(false)
// Créez une référence pour l'élément d'image
const imageElement = ref(null);

function changerEcran(valeur){
  console.log(valeur)
  jeu = valeur
  cinematique = false
  cle.value += 1
}

function closeChatBox(valeur){
  console.log(valeur)
  afficherChatBox.value = valeur
}
function openChatBox(){
  afficherChatBox.value = false
}

function openConstructeur(){
  afficherConstructeur.value = false
}
function closeConstructeur(valeur){
  afficherConstructeur.value = valeur
}
function easterEgg(){
  // Créez un nouvel élément d'image
  imageElement.value = new Image();

  // Définissez l'URL du GIF que vous souhaitez afficher
  imageElement.value.src = 'chemin_vers_votre_gif.gif';

  // Vous pouvez également ajouter d'autres attributs à l'élément d'image si nécessaire
  // imageElement.value.alt = 'Description du GIF';

  // Ajoutez l'élément d'image au DOM pour l'afficher
  document.body.appendChild(imageElement.value);
}

</script>

<template>
  <header>

  </header>

  <main>

    <cinématique @changement-ecran="changerEcran" v-if="cinematique" :key="cle"></cinématique>
    <div v-if="jeu" class="jeu">
      <div>
        <barre-laterale></barre-laterale>
      </div>

      <div class="ecran_ordinateur">
        <div class="ecran_application">
          <div class="constructeur">
            <constructeur @close-constructeur="closeConstructeur" v-if="!afficherConstructeur"></constructeur>
          </div>
          <div class="chat_box">
            <ComponentsMessagerie @close-chatbox="closeChatBox" v-if="!afficherChatBox"></ComponentsMessagerie>
          </div>
        </div>

        <div class="barre_tache">
          <img src="./img/icone_windows.png" alt="">
          <img src="./img/loupe%20(1).png" alt="">
          <img src="./img/icone_explorateur.png" alt="">
          <img src="./img/icone_google.png" alt="">
          <img src="./img/icone_base_donnee.png" alt="" class="app_ouvert" @click="openConstructeur">
          <img src="./img/icone_messagerie.png" alt="" class="app_ouvert" @click="openChatBox">
          <img src="./img/Fortnite_S1.png" alt="" @click="easterEgg">
        </div>
      </div>

<!--      <div class="constructeur">-->
<!--        <constructeur></constructeur>-->
<!--      </div>-->
<!--      <div class="chat_box">-->
<!--&lt;!&ndash;          <chat class="chat"></chat>&ndash;&gt;-->
<!--       <ComponentsMessagerie></ComponentsMessagerie>-->
<!--      </div>-->

    </div>
  </main>
</template>

<style>

* {
  font-family: 'Jura', sans-serif;
  user-select: none;
}

body {
  background-blend-mode: color;
  background-image: url("../src/assets/img/background-sqlhack.jpg"), linear-gradient(to right, black 10%, rgba(0, 0, 0, 0.2) 100%);
  background-size: cover;
  /*position: relative;*/
  /*background-position: center center;*/
  /*background-attachment: fixed;*/
  zoom: 110%;
}


header {
  line-height: 1.5;
}

.logo {
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
}

.animation_descente {
  animation: descend 1s ease-in-out;
  position: relative;
}

.animation_cote {
  animation: arrive 1s ease-in-out;
  position: relative;
}

/* Définition de l'animation 'descend' */
@keyframes descend {
  from {
    top: -200px; /* Position initiale en haut de la fenêtre */
  }
  to {
    top: 0; /* Position finale, la div est affichée en bas */
  }
}

/* Définition de l'animation 'arrive' */
@keyframes arrive {
  from {
    left: 200px /* Position initiale complètement à droite de la fenêtre */
  }
  to {
    left: 0; /* Position finale, la div est affichée à gauche */
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  //padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

/* Paramètres pour la totalité du tableau */
.table_result {
  width: 100%;
  margin: auto ;
  border-collapse: collapse ;
  background: white;
}

/* Paramètres pour les cellules classiques ET les cellules d'en-tête */
.table_result th, .table_result td {
  border: 1px solid #000000 ;
  padding: 5px ;
}

/* Paramètres pour les lignes d'en-tête uniquement */
.table_result th {
  background-color: #8f10ff ;
  color: #ffffff ;
}


/* Paramètres pour les lignes de contenu paires */
.table_result tr:not(:first-child):nth-child(even){
  background-color: lightgray;
}

.table_result td:hover {
  background-color: #8f10ff ;
  color: #ffffff;
}

.ecran_ordinateur{
  width: 1200px;
  height: 800px;
  border: 2px solid white;
  position: fixed;
  left: 500px;
  top: 100px;
  background-color: #000000;
}
.ecran_application{
  display: flex;
  justify-content: left;
  margin-top: 20px;
  margin-left: 100px;
}
.constructeur{
  margin-right: 50px;
}
.chat_box{
  height: 100px;
  width: 100px;
  margin-top: 50px;

}
.barre_tache {
  border-top: 1px gray solid;
  position: absolute;
  height: 60px;
  width: 100%;
  bottom: 0;
}
.barre_tache img {
  width: 3%;
  margin: 10px;
  display: inline-block;
}
.barre_tache img:hover{

}
.app_ouvert{

}
</style>
