<template>
  <constructeur4-bouton :text="text"></constructeur4-bouton>
  <constructeur-table> </constructeur-table>
  <constructeur-requete :text="text"></constructeur-requete>

  <button @click="ecrire">Ecrire</button>

</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurRequete from "@/pages/constructeur/constructeur-requete.vue"
import {ref} from "vue";

const text = ref()
function ecrire(){
  console.log("sadasdad")
}

</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}

</style>