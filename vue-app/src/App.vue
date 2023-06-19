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

    <div v-if="ecranJeu">
      <chat></chat>
      <constructeur></constructeur>
    </div>

  </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

</style>
