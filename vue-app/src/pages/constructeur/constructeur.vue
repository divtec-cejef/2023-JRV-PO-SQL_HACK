<template>

  <!-- Boutons des 4 commandes -->
  <div v-if="constructeurActuel === 0">
    <constructeur4-bouton @select="propriété"></constructeur4-bouton>
  </div>

  <!-- requête SELECT -->
  <div class="requete_select" v-if="commande===1">
    <div v-if="constructeurActuel === 1">
      <constructeur-table @propriete="propriété" :where="false" :commande="1"> </constructeur-table>
    </div>
    <div v-if="constructeurActuel === 2">
      <constructeur-condition @where="propriété"></constructeur-condition>
    </div>
    <div v-if="constructeurActuel === 3">
      <constructeur-table @propriete="propriété" :where="true" :commande="1"></constructeur-table>
    </div>
    <div v-if="constructeurActuel === 4">
      <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
      <button class="btnValider" @click="validerRequete">Valider</button>
    </div>
  </div>


  <!-- requête UPDATE -->
  <div class="requete_update" v-if="commande===2">
    <div v-if="constructeurActuel === 1">
      <constructeur-table @propriete="propriété" :where="false" :commande="2"> </constructeur-table>
    </div>
    <div>
      <div v-if="constructeurActuel === 2">
        <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
        <button class="btnValider" @click="testerInputText">Continuer</button>
      </div>
    </div>
    <div v-if="constructeurActuel===3">
      <constructeur-condition @where="propriété"></constructeur-condition>
    </div>
    <div v-if="constructeurActuel===4">
      <constructeur-table @propriete="propriété" :where="true" :commande="2"></constructeur-table>
    </div>
  </div>
  <div v-if="constructeurActuel===5">
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
import ConstructeurCondition from "@/pages/constructeur/constructeur-condition.vue";
import {ref} from "vue";

/* déclarations des variables*/
const requete = ref()
const textCondition = ref()
let constructeurActuel = 0;
let commande = 0

/**
 * Permet d'afficher le texte de la propriété de l'utilisateur dans l'input
 * @param valeur Valeur de la propriété que l'utilisateur à cliqué
 */
function propriété(valeur){
  if (valeur === "SELECT "){
    commande = 1
  } else if (valeur === "UPDATE "){
    commande = 2
  }
  requete.value += valeur
  constructeurActuel++
}

/***
 * Test si la requête est valide. Si le text de la condition
 * est vide on affiche une alert dialog, sinon on ajoute le
 * texte de la requête dans l'input en mode read only et on
 * efface remet à 0 le formulaire
 */
function validerRequete(){
  if (textCondition.value === ""){
    window.alert("Veuillez remplir le champs de saisie")
  } else {
    requete.value += textCondition.value
    window.alert(requete.value)
    effacer()
  }
}

function testerInputText(){
  if (textCondition.value === ""){
    window.alert("Veuillez remplir le champs de saisie")
  } else {
    requete.value += textCondition.value
    constructeurActuel++
  }
}

/***
 * efface le contenu de l'input qui contient la requête
 * + celui du constructeur et remet le constructeur actuel à 0
 */
function effacer(){
  requete.value = ""
  textCondition.value = ""
  constructeurActuel = 0
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