<script setup>
import FormRequest from "@/components/FormRequest.vue";
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Chat from "@/chatBox/chat.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
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
      <div class="barre_lateral_gauche">

      </div>
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

.barre_lateral_gauche{
  background-color: #8f10ff;
  width: 400px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.constructeur{
  margin-left: 400px;
  margin-top: 50px;
}

.chat_box {
  margin-left: 100px;
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
  justify-content: space-around;
}

.chat {
  align-self: flex-end;
}

</style>
