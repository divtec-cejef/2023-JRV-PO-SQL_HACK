<script setup>
import Constructeur from "@/pages/constructeur/constructeur.vue";
import BarreLaterale from "@/pages/barreLaterale/barre-laterale.vue";
import ComponentsMessagerie from "@/chatBox/ComponentsMessagerie.vue";

import {ref, onMounted, toRef} from "vue";
import CinematiqueFinNiv1 from "@/pages/cinématique/CinematiqueFinNiv1.vue";
import CinematiqueFinNiv2 from "@/pages/cinématique/CinematiqueFinNiv2.vue";
import CinematiqueDebut from "@/pages/cinématique/cinematiqueDebut.vue";
import VideoExemple from "@/pages/cinématique/VideoExemple.vue";


let afficherEcranJeu = ref(false)
let afficherCinematiqueDuDebut = ref(true)
let afficherCinematiqueFinNiveau1 = ref(false)
let afficherCinematiqueFinNiveau2 = ref(false)
let afficherVideoExemple = ref(false)

let cle = ref(0)
let afficherChatBox = ref(false)
let afficherConstructeur = ref(false)
let isBordered = ref(false);
const heureActuelle = ref('');
const dateActuelle = ref('');
let zIndexis4 = ref(true)

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

/***
 * Met à jour l'heure, la minute et la seconde au moment où le composant se lance
 */
const mettreAJourHeure = () => {
  const maintenant = new Date();
  const heure = maintenant.getHours();
  const minute = maintenant.getMinutes();
  const seconde = maintenant.getSeconds();

  // Formattez l'heure sous forme de chaîne HH:MM:SS
  heureActuelle.value = `${heure.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

/***
 * Met à jour la date au moment où le composant se lance
 */
const mettreAJourDate = () => {
  const maintenant = new Date();
  const annee = maintenant.getFullYear();
  const mois = maintenant.getMonth() + 1;
  const jour = maintenant.getDate();

  // Formattez la date sous forme de chaîne AAAA-MM-JJ
  dateActuelle.value = `${jour.toString().padStart(2, '0')}.${mois.toString().padStart(2, '0')}.${annee}`;
}

/***
 * Désactive la touche F5 pour éviter de reload l'écran
 * @param event Evénement de la pression de la touche
 */
const disabledF5 = (event) => {
  if (event.key === 'F5') {
    event.preventDefault();
    event.stopPropagation();
  }
}

/***
 * Se lance au moment du chargement du composant
 */
onMounted(() => {
  mettreAJourHeure();
  mettreAJourDate();

  // désactive la touche F5 qui permet de rééinitialiser la page
  document.addEventListener('keydown', disabledF5);

  // Mettez à jour l'heure chaque seconde (1000 millisecondes)
  setInterval(mettreAJourHeure, 1000);
});

/***
 * Fonction qui permet de passer de l'écran de la cinématique à
 * l'écran de jeu
 * @param valeur Boolean émit lors du dernier clic du bouton "continuer"
 */
function cinematiqueDebutToEcranJeu(valeur){
  console.log(valeur)
  afficherEcranJeu.value = valeur
  afficherCinematiqueDuDebut.value = false
  afficherVideoExemple.value = false
  afficherCinematiqueFinNiveau1.value = false
  cle.value += 1
}

/***
 * Fonction qui permet de passer de l'écran de la cinématique à
 * l'écran de jeu
 * @param valeur Boolean émit lors du dernier clic du bouton "continuer"
 */
function cinematiqueDebutToVideo(valeur){
  console.log(valeur)
  afficherVideoExemple.value = valeur
  afficherCinematiqueDuDebut.value = false
  afficherCinematiqueFinNiveau1.value = false
  cle.value += 1
}

/***
 * Fonction qui affiche la messagerie quand
 * on clique sur l'icone de la barre des tâches et
 * change aussi le style des icônes dans la barre des tâches
 */
function openChatBox(){
  afficherChatBox.value = false
  // change le style de l'icone quand l'appli est ouverte
  styleAppChatBox.value.borderBottom = '4px solid white';
  styleAppChatBox.value.paddingBottom = '6px';
  styleAppChatBox.value.marginBottom = '0px'
  styleAppChatBox.value.transition = '0.5s ease'
}

/***
 * Fonction qui affiche le constructeur quand
 * on clique sur l'icône de la barre des tâches et
 * change aussi le style des icônes dans la barre des tâches
 */
function openConstructeur() {
  afficherConstructeur.value = false
  isBordered.value = !isBordered.value;
  // change le style de l'icone quand l'appli est ouverte
  styleAppConstructeur.value.borderBottom = '4px solid white';
  styleAppConstructeur.value.paddingBottom = '6px';
  styleAppConstructeur.value.marginBottom = '0px'
  styleAppConstructeur.value.transition = '0.5s ease'
}

/***
 * Fonction qui rend invisible ("ferme") la messagerie
 * @param valeur Boolean émit quand on clique sur la croix pour
 *               "fermer" la messagerie
 */
function closeChatBox(valeur){
  console.log(valeur)
  afficherChatBox.value = valeur
  styleAppChatBox.value.borderBottom = '0px';
  styleAppChatBox.value.paddingBottom = '6px';
  styleAppChatBox.value.marginBottom = '3px'
}

/***
 * Fonction qui rend invisible ("ferme") le constructeur
 * @param valeur Boolean émit quand on clique sur la croix pour
 *               "fermer" le constructeur
 */
function closeConstructeur(valeur){
  afficherConstructeur.value = valeur
  styleAppConstructeur.value.borderBottom = '0px';
  styleAppConstructeur.value.paddingBottom = '6px';
  styleAppConstructeur.value.marginBottom = '3px'
}

/***
 * Fonction qui permet de passer de l'écran de jeu à la cinématique (avec la photo de la voiture)
 * où on a le choix de soit faire le "niveau 2" ou alors "quitter"
 * @param valeur Boolean émit si le niveau 1 est terminé donc quand
 *               l'utilisateur envoie "OK" après la modification du propriétaire
 */
function finNiveau1ToCinematique(valeur) {
  afficherCinematiqueFinNiveau1.value = valeur
  zIndexis4 = true
  afficherCinematiqueDuDebut.value = false
}

/***
 * Fonction qui permet de passer de la première cinématique de fin
 * jusqu'à l'écran de jeu pour le niveau 2 quand on clique sur le bouton
 * "niveau 2"
 * @param valeur Boolean émit quand on clique sur le bouton "niveau 2"
 */
function cinematiqueFinToNiveau2(valeur){
  afficherCinematiqueDuDebut.value = false
  afficherCinematiqueFinNiveau1.value = false
  zIndexis4 = false
}

/***
 * Fonction qui permet de passer de l'écran de jeu quand on termine le deuxième niveau
 * jusqu'à la cinématique 2 de fin du niveau 2
 * @param valeur Boolean émit lorsque le niveau 2 est terminé dans l'écran de jeu
 */
function finNiveau2ToCinematique(valeur) {
  cle.value += 1
  afficherCinematiqueFinNiveau2.value = valeur
  zIndexis4 = true
  afficherCinematiqueDuDebut.value = false
}

</script>

<template>
  <header>

  </header>

  <main>

    <!-- Cinématique du début -->
    <CinematiqueDebut @changement-ecran="cinematiqueDebutToEcranJeu" v-if="afficherCinematiqueDuDebut" :key="cle" class="cinematiqueDebut"></cinematiqueDebut>
<!--    <VideoExemple @VideoExemple="cinematiqueDebutToEcranJeu" v-if="afficherVideoExemple" :key="cle" ></VideoExemple>-->
    <!-- Écran de jeu -->
    <div class="jeu" :key="cle" v-if="afficherEcranJeu">
      <div>
        <barre-laterale></barre-laterale>
      </div>

      <div class="ecran_ordinateur">
        <div class="ecran_application">

          <div class="constructeur">
            <constructeur @close-constructeur="closeConstructeur" v-show="!afficherConstructeur" ></constructeur>
          </div>
          <div class="chat_box">
            <ComponentsMessagerie @close-chatbox="closeChatBox" v-show="!afficherChatBox" @cinematique-fin="finNiveau1ToCinematique" @cinematique-fin-niv2="finNiveau2ToCinematique"></ComponentsMessagerie>
          </div>
        </div>

        <div class="barre_tache">
          <div class="app">
            <img src="@/img/icone_windows.png" alt="">
            <img src="@/img/icone_loupe.png" alt="">
            <img src="@/img/icone_explorateur.png" alt="">
            <img src="@/img/icone_google.png" alt="">
            <img src="@/img/icone_base_donnee.png" alt="" :style="styleAppConstructeur" @click="openConstructeur" >
            <img src="@/img/icone_messagerie.png" alt="" :style="styleAppChatBox" @click="openChatBox">
            <img src="@/img/icone_word.png" alt="">
            <img src="@/img/icone_excel.png" alt="">
            <img src="@/img/icone_firefox.png" alt="">
          </div>
          <div class="widget_barre_tache">
            <div class="heure">{{ heureActuelle }}</div>
            <div class="date">{{ dateActuelle }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cinématique de fin du niveau 1  -->
    <div :key="cle" v-if="afficherCinematiqueFinNiveau1" :class="{'zindex': zIndexis4}">
      <cinematique-fin-niv1 @Niv2="cinematiqueFinToNiveau2" ></cinematique-fin-niv1>
    </div>

    <!-- Cinématique de fin du niveau 2  -->
    <div :key="cle" v-if="afficherCinematiqueFinNiveau2" :class="{'zindex': zIndexis4}">
      <cinematique-fin-niv2></cinematique-fin-niv2>
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
  border: 2px solid #808080;
  position: fixed;
  left: 500px;
  top: 100px;
  background-color: #000000;
  background-image: url("img/FondEcranWin10.jpg");
  background-position: center;
  background-size: 100%;

}
.ecran_application{
  display: flex;
  justify-content: left;
  margin-top: 20px;
  margin-left: 100px;
  z-index: 1;
}
.constructeur{
  margin-right: 50px;
  background-color: black;
  z-index: 4;
  box-shadow: #222222;
}
.chat_box{
  height: 100px;
  width: 100px;
  margin-top: 50px;
  z-index: 4;
}
.barre_tache {
  border-top: 1px solid #808080;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  bottom: 0;
  background-color: #222222;
}
.barre_tache img {
  width: 3.2%;
  margin: 10px;
  display: inline-block;
}
.app{

}
.widget_barre_tache{
  display: block;
  text-align: right;
  padding: 20px;
  color: white;
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
.table_result td {
  border: black 1px solid;
  text-align: center;
  padding: 5px ;
  max-width: 129px;
  max-height: 29px;
}

/* Paramètres pour les lignes d'en-tête uniquement */
.table_result th {
  border-left: black 1px solid;
  border-right: black 1px solid;
  border-top: #FFFFFF 2px solid;
  padding: 5px ;
  max-width: 129px;
  max-height: 29px;
  background-color: #000000;
  color: #27FF16;
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
.slide-down {
  position: absolute;
}
.icone_easter_egg{
  width: 2.7%;
  position: fixed;
  left: 800px;
  top: 400px;
  z-index: 2;
}
.date{
  margin-left: -50px;
}
.zindex {
  z-index: 4;
}

</style>
