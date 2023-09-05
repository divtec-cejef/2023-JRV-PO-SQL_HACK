<script setup>
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Chat from "@/chatBox/chat.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
import BarreLaterale from "@/pages/barreLaterale/barre-laterale.vue";
import {ref} from "vue";

let ecranJeu = ref(false)
let cinematique = ref(true)
let cle = ref(0)

function changerEcran(valeur){
  console.log(valeur)
  ecranJeu = valeur
  cinematique = false
  cle.value += 1
}

</script>

<template>
  <header>

  </header>

  <main>
    <cinématique @changement-ecran="changerEcran" v-if="cinematique" :key="cle"></cinématique>
    <div v-if="ecranJeu" class="ecran_hackeur">

      <barre-laterale></barre-laterale>

      <div class="constructeur">
        <constructeur></constructeur>
      </div>
      <div class="chat_box">
        <chat class="chat"></chat>
      </div>

    </div>

  </main>
</template>

<style>

header {
  line-height: 1.5;
}

.logo {
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
}

.constructeur{
  margin-left: 500px;
  margin-top: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.chat_box {
  margin-left: 200px;
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

.ecran_hackeur {
  display: flex;
}

.chat {
  align-self: flex-end;
}

</style>
