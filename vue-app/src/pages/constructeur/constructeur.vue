<template>
  <constructeur4-bouton @select="maFonction"></constructeur4-bouton>
  <constructeur-table> </constructeur-table>
  <constructeur-requete></constructeur-requete>
  <parent></parent>
  <enfant></enfant>

  <label for="text-requete">Texte en lecture seule</label>
  <input type="text" id="text-requete" :value="text" readonly>
</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurRequete from "@/pages/constructeur/constructeur-requete.vue"


import {ref} from "vue";
import Parent from "@/pages/constructeur/test/parent.vue";

const text = ref()
function maFonction(valeur){
  text.value = valeur
}
</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}

</style>