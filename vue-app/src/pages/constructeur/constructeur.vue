<template>
  <constructeur4-bouton @select="maFonction"></constructeur4-bouton>
  <constructeur-table @propriete="propriété"> </constructeur-table>
  <constructeur-requete></constructeur-requete>

  <input type="text" id="text-requete" :value="text" readonly>
  <button @click="effacer">Effacer</button>
</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurRequete from "@/pages/constructeur/constructeur-requete.vue"


import {ref} from "vue";
import Parent from "@/pages/constructeur/test/parent.vue";

const text = ref()
function maFonction(valeur){
  text.value += valeur
}
function propriété(valeur){
  text.value += valeur
}
function effacer(){
  text.value = ""
}
</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}

</style>