<template>
  <div>
    <constructeur4-bouton @select="propriété"></constructeur4-bouton>
  </div>


  <constructeur-table @propriete="propriété"> </constructeur-table>
  <constructeur-requete></constructeur-requete>

  <constructeur-condition @where="propriété"></constructeur-condition>

  <constructeur-table @propriete="propriété" :where="true"></constructeur-table>

  <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
  <button class="btnValider" @click="validerRequete">Valider</button>

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
import Parent from "@/pages/constructeur/test/parent.vue";

const requete = ref()
const textCondition = ref()

let isClicked = false;

function propriété(valeur){
  isClicked = true
  requete.value += valeur
}

function validerRequete(){
  requete.value += textCondition.value
  window.alert(requete.value)
}

function effacer(){
  requete.value = ""
  textCondition.value = ""
}
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