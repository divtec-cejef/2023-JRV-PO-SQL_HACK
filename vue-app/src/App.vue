<script setup>
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
import BarreLaterale from "@/pages/barreLaterale/barre-laterale.vue";
import ComponentsMessagerie from "@/chatBox/ComponentsMessagerie.vue";
import {ref} from "vue";

let jeu = ref(false)
let cinematique = ref(true)
let cle = ref(0)
let afficherChatBox = ref(false)
let afficherConstructeur = ref(false)
let isBordered = ref(false);
// Créez une référence pour l'élément d'image
const imageElement = ref(null);

const styleAppConstructeur = ref({
  borderBottom :'4px solid white',
  paddingBottom : '6px',
  marginBottom : '0px'
})

const styleAppChatBox = ref({
  borderBottom :'4px solid white',
  paddingBottom : '6px',
  marginBottom : '0px'
});

function changerEcran(valeur){
  console.log(valeur)
  jeu = valeur
  cinematique = false
  cle.value += 1
}

function openChatBox(){
  afficherChatBox.value = false
  // change le style de l'icone quand l'appli est ouverte
  styleAppChatBox.value.borderBottom = '4px solid white';
  styleAppChatBox.value.paddingBottom = '6px';
  styleAppChatBox.value.marginBottom = '0px'
  styleAppChatBox.value.transition = '0.5s ease'
}
function openConstructeur() {
  afficherConstructeur.value = false
  isBordered.value = !isBordered.value;
  // change le style de l'icone quand l'appli est ouverte
  styleAppConstructeur.value.borderBottom = '4px solid white';
  styleAppConstructeur.value.paddingBottom = '6px';
  styleAppConstructeur.value.marginBottom = '0px'
  styleAppConstructeur.value.transition = '0.5s ease'
}
function closeChatBox(valeur){
  console.log(valeur)
  afficherChatBox.value = valeur
  //sdasda
  styleAppChatBox.value.borderBottom = '0px';
  styleAppChatBox.value.paddingBottom = '6px';
  styleAppChatBox.value.marginBottom = '3px'
}
function closeConstructeur(valeur){
  afficherConstructeur.value = valeur
  styleAppConstructeur.value.borderBottom = '0px';
  styleAppConstructeur.value.paddingBottom = '6px';
  styleAppConstructeur.value.marginBottom = '3px'


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
          <img src="./img/icone_base_donnee.png" alt="" :style="styleAppConstructeur" @click="openConstructeur" >
          <img src="./img/icone_messagerie.png" alt="" :style="styleAppChatBox" @click="openChatBox">
          <img src="./img/Fortnite_S1.png" alt="" @click="easterEgg">
          <div class="widget_barre_tache">14:01</div>
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
    transform: translate(-100%, -100%);
  }
  to {
    transform: translate(0, 0);
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
.ecran_ordinateur{
  width: 1200px;
  height: 800px;
  border: 2px solid white;
  position: fixed;
  left: 500px;
  top: 100px;
  background-color: #000000;
  background-image: url("../src/img/fond_ecran_anonymous.jpg");
  background-position: center;
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
  border-top: 1px solid #808080;
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
.widget_barre_tache{
  display: flex;
  justify-content: right;
}



/* Paramètres pour la totalité du tableau */
.table_result {
  width: 100%;
  margin: auto ;
  background: white;
  border-collapse: collapse; /* Pour éviter les espaces entre les cellules */
  border: 1px solid #ffffff; /* Bordure extérieure blanche */
}

/* Paramètres pour les cellules classiques ET les cellules d'en-tête */
.table_result th, .table_result td {
  border: 1px solid #000000 ;
  padding: 5px ;
  max-width: 129px;
  max-height: 29px;
}

/* Paramètres pour les lignes d'en-tête uniquement */
.table_result th {
  background-color: #27FF16;
  color: #000000;
  font-weight: bold;
}


/* Paramètres pour les lignes de contenu paires */
.table_result tr:not(:first-child):nth-child(even){
  background-color: #ffffff;
}

.encadrer {

  overflow: hidden; /* Cacher le contenu dépassant */
  display: inline-block;
  background-color: lightgray; /* Fond vert */
  border: black 1px solid;
  padding: 5px 10px; /* Espacement interne */
  border-radius: 5px; /* Coins arrondis */
  transform: translateY(-50px); /* Initialement décalée vers le haut */
  z-index: 1;
}

.BtnCopier{
  background-color: transparent; /* Couleur de fond transparente */
  color: #000; /* Couleur du texte (noir par défaut) */
  border: 1px solid transparent; /* Bordure transparente */
}
</style>
