<template>

  <div>
    <button @click="addWhere">Ajouter un filtre + </button>
    <div class="bubble">Un filtre permet de restreindre les résultats renvoyés par une base de données selon certains critères</div>
    <button @click="validerSansCondition" v-if="etat" class="no_filter">Valider sans filtre</button>
  </div>

</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['where', 'sans-condition', 'valider_sans_condition'])
const props = defineProps(['etat'])

/***
 * Emet la chaine de caractère WHERE pour
 * l'écrire dans l'input de la requête
 */
function addWhere(){
  emits('where', ' WHERE')
}

/***
 * Emet qu'on ne veut pas de condition
 */
function validerSansCondition(){
  emits('valider_sans_condition', 'sans_condition')
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@600');

div{
  padding: 50px;
  text-align: center;
}
button {
  margin: 3px;
  font-size: 32px;
  width: fit-content;
  background-color: #FFFFFF;
  color: black;
  padding: 20px;
  border-radius: 20px;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
}
button {
  transition: transform 500ms ease;
  margin-bottom: 10px;
}
button:hover{
  transform: scale(1.1);
}

.bubble {
  display: inline-block;
  background-color: #4CAF50; /* Fond vert */
  color: #fff; /* Texte blanc */
  padding: 10px 20px; /* Espacement interne */
  border-radius: 5px; /* Coins arrondis */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Ombre légère */
  opacity: 0; /* Initialement cachée */
  transform: translateY(-200px); /* Initialement décalée vers le haut */
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; /* Transition d'opacité et de transformation */
  }

button:hover + .bubble {
  opacity: 1; /* Affiche la bulle */
  transform: translateY(-170px); /* Déplace la bulle vers le bas */
}

/* Animation de la bulle */
@keyframes pop {
  0% {
    transform: translateX(-50%) scale(0); /* La bulle commence à l'échelle 0 (invisible) */
  }
  100% {
    transform: translateX(-50%) scale(1); /* La bulle atteint sa taille normale */
  }
}

.no_filter {
  margin-top: -300px;
}

</style>