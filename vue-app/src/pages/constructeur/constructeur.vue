<template>

  <div v-if="constructeurActuel === 0">
    <constructeur4-bouton @select="propriété"></constructeur4-bouton>
  </div>

  <div v-if="constructeurActuel === 1">
    <constructeur-table @propriete="propriété"> </constructeur-table>
  </div>

  <div v-if="constructeurActuel === 2">
    <constructeur-condition @where="propriété"></constructeur-condition>
  </div>

  <div v-if="constructeurActuel === 3">
    <constructeur-table @propriete="propriété" :where="true"></constructeur-table>
  </div>

  <div v-if="constructeurActuel === 4">
    <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
    <button class="btnValider" @click="validerRequete">Valider</button>
  </div>

  <br>
  <input type="text" id="text-requete" :value="requete" readonly>
  <button @click="effacer">Effacer</button>

</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurRequete from "@/pages/constructeur/constructeur-requete.vue"
import ConstructeurCondition from "@/pages/constructeur/constructeur-condition.vue";

import {ref} from "vue";


const requete = ref()
const textCondition = ref()

let isClicked = false;

function propriété(valeur){
  isClicked = true
  requete.value += valeur
  constructeurActuel++
}

function validerRequete(){
  requete.value += textCondition.value
  window.alert(requete.value)
  constructeurActuel = 0
}

function effacer(){
  requete.value = ""
  textCondition.value = ""
  constructeurActuel = 0
}

/* changement de constructeur les uns sur les autres*/
let constructeurActuel = 0;


</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}
div{
  width: fit-content;
}

input {
  width: 100%;
}
button{
  width: 30%;
  height: 40px;
}
.btnValider{
  margin-bottom: 50px;
}

</style>