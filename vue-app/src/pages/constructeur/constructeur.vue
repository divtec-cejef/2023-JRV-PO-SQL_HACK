
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
            <div v-if="constructeurActuel === 1" class="constructeur_table_et_propriete">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="1"
                                            @table_selectionnee="changeTableSelectionnee"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2" class="btn_condition">
              <constructeur-condition @where="propriété" @valider_sans_condition="validerSansCondition"
              :etat="true"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel === 3" class="constructeur_table_et_propriete">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="true" :commande="1"
                                            @propriete_selectionnee="changeProprieteSelectionnee" :table="table_selectionnee"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 4" class="saisie_condition">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition" class="text_condition">
              <button class="btnValider" @click="valideRequete('select')">Valider</button>
            </div>
          </div>

          <!-- requête UPDATE -->
          <div class="requete_update, constructeur_table_et_propriete" v-if="commande_selectionnee===2">
            <div v-if="constructeurActuel === 1">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="2"
                                            @propriete_selectionnee="changeProprieteSelectionnee"
                                            @table_selectionnee="changeTableSelectionnee"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2" class="saisie_condition">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition" class="text_condition">
              <button class="btnValider" @click="valideRequete('conditionUpdate1')">Continuer</button>
            </div>
            <div v-if="constructeurActuel===3" class="btn_condition">
              <constructeur-condition @where="propriété" :etat="false"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel===4" class="constructeur_table_et_propriete">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="2"
                                            @propriete_selectionnee="changeProprieteSelectionnee"
                                            :table="table_selectionnee"></ConstructeurTableEtPropriete>
            </div>
          </div>
          <div v-if="constructeurActuel===5" class="text_condition">
            <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
            <button class="btnValider" @click="valideRequete('update')">Valider</button>
          </div>

          <!-- requête INSERT -->
          <div class="requete_insert" v-if="commande_selectionnee===3">
            <div v-if="constructeurActuel===1">
              <constructeur-table @propriete="proprieteInsert"></constructeur-table>
            </div>
            <div v-if="constructeurActuel===2" class="property_insert">
              <constructeur-property-insert :table="table_selectionnee" @datainsert="validerValuesInsert"
              @change-taille-textarea="changeTailleTextarea" @etat-btn-envoi-requete="changeEtatBtnEnvoiRequete"></constructeur-property-insert>
            </div>
          </div>

          <!-- DELETE -->
          <div class="requete_delete" v-if="commande_selectionnee===4">
            <div v-if="constructeurActuel===1">
              <constructeur-table @props-delete="proprieteDelete"
                                  @propriete="changeTableSelectionnee"></constructeur-table>
            </div>
            <div v-if="constructeurActuel===2" class="btn_condition">
              <constructeur-condition @where="propriété" :etat="false"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel===3" class="constructeur_table_et_propriete">
              <constructeur-table-et-propriete @propriete="propriété" :where="false" :commande="4"
              @propriete_selectionnee="changeProprieteSelectionnee" :table="table_selectionnee"></constructeur-table-et-propriete>
            </div>
            <div v-if="constructeurActuel===4" class="text_condition">
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Text de la condition">
              <button class="btnValider" @click="valideRequete('delete')">Valider</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Texte de la requête dans l'input read only -->
    <div class="text_requete">
      <textarea name="text_requete" id="text-requete" cols="2" rows="2" :value="text_requete" readonly></textarea>
    </div>

      <div class="resultat_requete" id="resultat_requete">

      </div>



    <div class="bouton_finaux">
      <!-- Bouton finaux -->
      <button @click="effacer">Recommencer</button>


    <button @click="sendRequestFromConstructor()" :class="{'disabled': etatBtnEnvoiRequete}">Envoyer la requête</button>

    </div>
  </div>
</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTableEtPropriete from "@/pages/constructeur/constructeur-table-et-propriete.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurCondition from "@/pages/constructeur/constructeur-condition.vue";
import ConstructeurPropertyInsert from "@/pages/constructeur/constructeur-property-insert.vue";

import {reactive, ref} from "vue";
import ConstructeurValiderSansCondition from "@/pages/constructeur/constructeur-valider-sans-condition.vue"


import { sendRequest } from "@/tools/requestDB";


/* déclarations des variables*/
const text_requete = ref('')
let resultat_requete = ref()
const textCondition = ref()
let constructeurActuel = 0
let commande_selectionnee = 0
let table_selectionnee = ""
let propriete_selectionnee = ""
let etatBtnEnvoiRequete = true
const maDiv = ref(null)

const styleTextArea = ref({
  width: '99%',
  height: '100%'
});

const styleDivTextarea = ref({
  width: '100%',
  height: '41%',
  fontSize: '28px'
});

function changeTailleTextarea(){
  styleTextArea.value.height = '600px'
}

function changeEtatBtnEnvoiRequete(){
  etatBtnEnvoiRequete = false
}

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
    case "sans_condition": commande_selectionnee = -1; break;
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
  styleTextArea.value.height = '300px'
  etatBtnEnvoiRequete = true
  maDiv.removeChild(table)

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

/**
 * Fonction qui permet de changer la variable "propriete_selectionnee"
 * avec la valeur passé en paramètre
 * @param valeur propriété actuellement sélectionnée
 */
function changeProprieteSelectionnee(valeur){
  propriete_selectionnee = valeur
  textCondition.value = ""
}

function changeTableSelectionnee(valeur){
  table_selectionnee = valeur
  console.log(valeur)
}

/***
 * Fonction qui permet de tester le champs de saisie de la condition
 * @param commande si la commande correspond au constructeur actuel update
 */
function valideRequete(commande) {
  console.log(propriete_selectionnee);

  if (["idVoiture", "idPersonne", "idMateriel"].includes(propriete_selectionnee)) {
    if (Number.isInteger(parseInt(textCondition.value))) {
      addValeurToTextRequete(textCondition.value);
    } else {
      window.alert("Vous devez saisir un nombre");
      return;
    }
  } else if (propriete_selectionnee === "date_de_naissance") {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(textCondition.value)) {
      addValeurToTextRequete(textCondition.value);
    } else {
      window.alert("Le format de la date doit être : aaaa-mm-jj");
      return;
    }
  } else {
    if (textCondition.value !== "") {
      console.log("champs rempli")
      text_requete.value += "'";
      addValeurToTextRequete(textCondition.value);
      text_requete.value += "'";
      console.log(text_requete.value);
    } else {
      console.log("champs vide")
      window.alert("Vous ne pouvez pas insérer de chaîne vide");
      return;
    }
  }

  if (commande === "conditionUpdate1"){
    constructeurActuel++
  } else {
    constructeurActuel = 6
    text_requete.value += ";"
    changeTailleTextarea()
  }
  etatBtnEnvoiRequete = false
}

function validerSansCondition(){
  constructeurActuel = 6
  text_requete.value += ";"
  changeTailleTextarea()
  etatBtnEnvoiRequete = false
}

function sendRequestFromConstructor() {
  sendRequest(text_requete.value);
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
  background-color: black;
  width: 600px;
  height: 700px;
}
.text_requete textarea{
  resize: none;
}

/* Constructeur */
.constructeur{
  height: 300px;
  margin: auto;
}

/* Text requête */
.text_requete{
  width: 99%;
  margin: 0;
}
#text-requete{
  width: 588px;
  font-size: 28px;
  color: white;
  height: 100px;
  margin: 0;
  background-color: black;
  border-top: 5px solid white;
  border-bottom: 5px solid white;
  padding: 5px;
}

.bouton_finaux button{
  width: 150px;
  margin-top: 30px;
}
.constructeur_table_et_propriete{
  margin-left: 40px;
}
.btnValider{
  margin-top: 25px;
  width: 100px;
  height: 50px;
}
.saisie_condition{
  display: inline-block;
  text-align: center;
  padding-top: 100px;
  padding-right: 200px;
  padding-left: 200px;
}
.property_insert{
  margin-left: 150px;
  padding-top: 30px;
}
.disabled{
  pointer-events: none;
  color: gray;
}

</style>