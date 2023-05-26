<template>

  <!-- Écran de gauche qui contient : constructeur, texte requête
 et le résultat de la requête-->
  <div class="ecran_gauche">

    <!-- Constructeur de la requête-->
    <div v-if="constructeurActuel !== 6">
      <div class="constructeur">
        <div class="commande">

          <!-- Boutons des 4 commandes -->
          <div v-if="constructeurActuel === 0">
            <constructeur4-bouton @select="propriété"></constructeur4-bouton>
          </div>

          <!-- requête SELECT -->
          <div class="requete_select" v-if="commande_selectionnee===1">
            <div v-if="constructeurActuel === 1">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="1"> </ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2">
              <constructeur-condition @where="propriété"></constructeur-condition>
              <button @click="">Valider sans condition</button>
            </div>
            <div v-if="constructeurActuel === 3">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="true" :commande="1"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 4">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
              <button class="btnValider" @click="validerRequete">Valider</button>
            </div>
          </div>

          <!-- requête UPDATE -->
          <div class="requete_update" v-if="commande_selectionnee===2">
            <div v-if="constructeurActuel === 1">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="2"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
              <button class="btnValider" @click="testerInputText">Continuer</button>
            </div>
            <div v-if="constructeurActuel===3">
              <constructeur-condition @where="propriété"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel===4">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="true" :commande="2"></ConstructeurTableEtPropriete>
            </div>
          </div>
          <div v-if="constructeurActuel===5">
            <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
            <button class="btnValider" @click="validerRequete">Valider</button>
          </div>

          <!-- requête INSERT -->
          <div class="requete_insert" v-if="commande_selectionnee===3">
            <div v-if="constructeurActuel===1">
              <constructeur-table @propriete="proprieteInsert"></constructeur-table>
            </div>
            <div v-if="constructeurActuel===2">
              <constructeur-property-insert :table="table_selectionnee" @datainsert="validerValuesInsert"></constructeur-property-insert>
            </div>
          </div>

          <!-- DELETE -->
          <div class="requete_delete" v-if="commande_selectionnee===4">
            <div v-if="constructeurActuel===1">
              <constructeur-table @props-delete="proprieteDelete"></constructeur-table>
            </div>
            <div v-if="constructeurActuel===2">
              <constructeur-condition @where="propriété"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel===3">
              <constructeur-table-et-propriete @propriete="propriété" :where="false" :commande="4"></constructeur-table-et-propriete>
            </div>
            <div v-if="constructeurActuel===4">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
              <button class="btnValider" @click="validerRequete">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Texte de la requête dans l'input read only -->
    <div class="text_requete">
      <textarea name="text_requete" id="text-requete" cols="2" rows="2" :value="text_requete" readonly></textarea>
    </div>



    <!-- Résultat de la requête -->
    <div class="resultat_requete">
      <textarea name="resultat_requete" id="result-requete" cols="2" rows="2" :value="resultat_requete" readonly></textarea>
    </div>

  </div>

  <div class="bouton_finaux">
    <!-- Bouton finaux -->
    <button @click="effacer">Recommencer</button>
    <button @click="envoyer">Envoyer la requête</button>
  </div>

</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTableEtPropriete from "@/pages/constructeur/constructeur-table-et-propriete.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurCondition from "@/pages/constructeur/constructeur-condition.vue";
import ConstructeurPropertyInsert from "@/pages/constructeur/constructeur-property-insert.vue"
import {ref} from "vue";

/* déclarations des variables*/
let text_requete = ref()
let resultat_requete = ref()
const textCondition = ref()
let constructeurActuel = 0
let commande_selectionnee = 0
let table_selectionnee = ""
let finDeRequete = false


/***
 * Ajoute la valeur passée en paramètre dans le texte area
 * pour la requête
 * @param valeur
 */
function addValeurToTextRequete(valeur){
  if (constructeurActuel === 0){
    text_requete.value = ""
  }
  text_requete.value += valeur
}

/****
 * Fonction qui teste la commande sélectionnée et ensuite
 * modifie la valeur de la variable "commande" grâce à un switch
 * @param valeur Valeur émise depuis le constructeur-4-bouton
 */
function commandeSelectionee(valeur) {
  switch (valeur) {
    case "SELECT":  commande_selectionnee = 1;  break;
    case "UPDATE":  commande_selectionnee = 2;  break;
    case "INSERT":  commande_selectionnee = 3;  break;
    case "DELETE":  commande_selectionnee = 4;  break;
  }
}

/**
 * Permet d'afficher le texte de la propriété de l'utilisateur dans l'input
 * et modifie la variable "commande" selon la commande (bouton) sélectionné
 * @param valeur Valeur de la propriété que l'utilisateur à cliqué
 */
function propriété(valeur){
  commandeSelectionee(valeur)
  addValeurToTextRequete(valeur)
  constructeurActuel++
  console.log(constructeurActuel + " " + commande_selectionnee)
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
    text_requete.value += "'" + textCondition.value + "'"
    constructeurActuel = 6
  }
  text_requete.value += ";"
}

/****
 * Fonction ajoute les saisies de l'utilisateur
 * Une fonction dans le composant constructeur-property-insert
 * test si les champs sont bien remplis
 * On met le constructeur actuel à 6 pour que le v-if du div
 * s'active et enlève le constructeur lorsqu'on valide
 * @param valeur
 */
function validerValuesInsert(valeur){
  addValeurToTextRequete(valeur)
  constructeurActuel = 6
}


/***
 * Teste si le champs de saisie de texte pour
 * la condition est vide ou non
 * Si oui : boite de dialogue s'affiche
 * Si non : On ajoute le texte au textarea de la requete
 *          et on incrément le constructeur actuel
 */
function testerInputText(){
  if (textCondition.value === ""){
    window.alert("Veuillez remplir le champs de saisie")
  } else {
    text_requete.value += "'" + textCondition.value + "'"
    constructeurActuel++
    textCondition.value = ""
  }
}

/***
 * efface le contenu de l'input qui contient la requête
 * + celui du constructeur et remet le constructeur actuel à 0
 */
function effacer(){
  text_requete.value = ""
  textCondition.value = ""
  resultat_requete.value = ""
  constructeurActuel = 0
}

function proprieteInsert(valeur) {
  commande_selectionnee = 3;
  text_requete.value += " INTO " + valeur;
  table_selectionnee = valeur;
  constructeurActuel++;
}

/***
 * Ajoute les propriétés lorsque la commande DELETE est choisi
 * @param valeur
 */
function proprieteDelete(valeur){
  commande_selectionnee = 4
  text_requete.value += " FROM " + valeur
  constructeurActuel++
}

/****
 * Affiche la requête dans un window alert
 */
function envoyer(){
  window.alert(text_requete.value)
}

</script>

<style scoped>
*{
  margin: 0;
}
div{
  width: fit-content;
}
button{
  width: 30%;
  height: 40px;
}
#text-conditon{
  height: 50px;
}
.btnValider{

}

/* écran gauche */
.ecran_gauche{
  border: red 4px solid;
  width: 600px;
  height: 700px;
}
.text_requete textarea, .resultat_requete textarea{
  resize: none;
}


/* Constructeur */
.constructeur{
  height: 300px;
  margin: auto;
}

/* Text requête */
.text_requete{
  width: 100%;
  margin: 0;
}
#text-requete{
  width: 100%;
  font-size: 28px;
  height: 100px;
  margin: 0;
}

/* Resultat requête */
.resultat_requete{
  width: 100%;
  margin: 0;
}
#result-requete{
  width: 100%;
  height: 290px;
  font-size: 28px;
}
.bouton_finaux{
  width: 50%;
}

</style>