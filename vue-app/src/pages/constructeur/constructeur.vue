<template>

  <div class="constructeur_app">

    <div class="barre-onglet">
      <div class="nomAppConstructeur">Constructeur</div>
      <div class="button_fenetre">
        <button><img src="../../assets/icon/moins.png" class="minus"></button>
        <button><img src="../../assets/icon/carre.png" alt="" class="square"></button>
        <button @click="close" ><img src="../../assets/icon/traverser.png" alt="" class="close"></button>
      </div>
    </div>

    <!-- Constructeur de la requête-->
    <div v-if="constructeurActuel !== 6">

      <div class="constructeur">
        <div class="commande">

          <!-- Boutons des 4 commandes -->
          <div v-if="constructeurActuel === 0" class="constructeur4bouton">
            <constructeur4-bouton @select="propriété"></constructeur4-bouton>
          </div>

          <!-- requête SELECT -->
          <div class="requete_select" v-if="commande_selectionnee===1" :key="cle">
            <div v-if="constructeurActuel === 1" class="constructeur_table_et_propriete">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="1"
                                            @table_selectionnee="changeTableSelectionnee" :label="'table'"
                                            :li-is-hover="false" :ul-is-hover="true" :p-is-hover="true"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2" class="btn_condition">
              <constructeur-condition @where="propriété" @valider_sans_condition="validerSansCondition"
              :etat="true"></constructeur-condition>
            </div>
            <div v-if="constructeurActuel === 3" class="constructeur_table_et_propriete">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="true" :commande="1"
                                            @propriete_selectionnee="changeProprieteSelectionnee"
                                            :table="table_selectionnee" :label="'propriété'" :li-is-hover="true" :ul-is-hover="false"
                                            @focus_input="focusInput" :p-is-hover="false"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 4" class="saisie_condition_select">

              <div class="condition_select">
                <div class="text_indication_saisie">{{ texteTitreSaisieID }}</div>
                <div class="input_et_bouton">
                  <!-- input pour la saisie d'un nombre (id)-->
                  <input type="number" id="text-conditon" v-model="textCondition" placeholder="Ecrire ici" class="text_condition_select"
                         @keydown.enter.prevent="valideRequete(false)" v-if="inputIsNumber" autocomplete="off">
                  <!-- input pour la saisie d'un texte -->
                  <input type="text" id="text-conditon" v-model="textCondition" placeholder="Ecrire ici" class="text_condition_select"
                         @keydown.enter.prevent="valideRequete(false)" v-if="!inputIsNumber" autocomplete="off" autofocus>
                  <button class="btnValider" @click="valideRequete(false)">Envoyer la requête</button>
                </div>
              </div>
            </div>
          </div>

          <!-- requête UPDATE -->
          <div class="requete_update, constructeur_table_et_propriete" v-if="commande_selectionnee===2">
            <div v-if="constructeurActuel === 1">
              <ConstructeurTableEtPropriete @propriete="propriété" :where="false" :commande="2"
                                            @propriete_selectionnee="changeProprieteSelectionnee"
                                            @table_selectionnee="changeTableSelectionnee" :is-update="true"
                                            :label="'propriété à changer'" :ul-is-hover="false" :li-is-hover="true"
                                            :p-is-hover="true"></ConstructeurTableEtPropriete>
            </div>
            <div v-if="constructeurActuel === 2" class="saisie_condition">
              <div class="text_saisie_id">{{ texteTitreSaisieID }}</div>
              <input type="text" id="text-conditon" v-model="textCondition" placeholder="Ecrire ici" class="text_condition"
                     @keydown.enter.prevent="valideRequete(true)" autofocus autocomplete="off">
              <button class="btnValider" @click="valideRequete(true)">Continuer</button>
            </div>
            <div v-if="constructeurActuel===3" class="saisie_condition">
              <div class="text_saisie_id">Saisissez l'id correspondant :</div>
              <input type="number" id="num-id" v-model="numId" placeholder="Ecrire ici" class="text_condition"
                     @keydown.enter.prevent="valideRequeteUpdate" autofocus autocomplete="off">
              <button class="btnValider" @click="valideRequeteUpdate">Envoyer la requête</button>
            </div>
          </div>

          <!-- requête INSERT -->
          <div class="requete_insert" v-if="commande_selectionnee===3">
            <div v-if="constructeurActuel===1">
              <constructeur-table-et-propriete :label="'table'" :where="false" :commande="3" @propriete="propriété"
                                               @propriete_selectionnee="changeProprieteSelectionnee"
                                               @table_selectionnee="changeTableSelectionnee"
                                               :ul-is-hover="true" :li-is-hover="false" :p-is-hover="true"></constructeur-table-et-propriete>
            </div>
            <div v-if="constructeurActuel===2" class="property_insert">
              <constructeur-property-insert :table="table_selectionnee" @datainsert="validerValuesInsert"
              @change-taille-textarea="changeTailleTextarea" @etat-btn-envoi-requete="changeEtatBtnEnvoiRequete"></constructeur-property-insert>
            </div>
          </div>

          <!-- DELETE -->
          <div class="requete_delete" v-if="commande_selectionnee===4">
            <div v-if="constructeurActuel===1">
              <constructeur-table-et-propriete :label="'table'" :where="false" :commande="4" @propriete="propriété"
                                               @propriete_selectionnee="changeProprieteSelectionnee"
                                               @table_selectionnee="changeTableSelectionnee"
                                               :ul-is-hover="true" :li-is-hover="false" :p-is-hover="true"></constructeur-table-et-propriete>
            </div>

            <div v-if="constructeurActuel===2" class="btn_condition">
              <div class="saisie_condition_delete">
                <div class="text_saisie_id_et_input">
                  <div class="text_saisie_id">Saisissez l'id :</div>
                </div>
                <div>
                  <input type="number" id="num-id" v-model="numId" placeholder="ID" class="text_condition"
                         @keydown.enter.prevent="valideRequeteUpdate" autocomplete="off">
                  <button class="btnValider" @click="valideRequeteUpdate">Envoyer la requête</button>
                </div>
              </div>
            </div>

            <!-- fin -->
          </div>
        </div>
      </div>
    </div>

    <button @click="effacer" class="bouton_finaux bouton_recommencer">Recommencer <img src="../../assets/img/annuler.png" class="img_recommencer"></button>
    <button @click="retour" :disabled="btnRetourIsDisabled"
            v-if="constructeurActuel!==0 && constructeurActuel!==6" class="bouton_finaux">Retour <img src="../../assets/img/fleche-gauche.png"
                                                                                                      class="img_retour"></button>
    <!-- Texte de la requête dans l'input read only -->
    <div class="div_text_requete">
      <textarea ref="textarea" name="text_requete typing-animation" id="text-requete" cols="2" rows="2"
                :value="query" :style="styleTextArea" readonly></textarea>
    </div>

    <!-- Tableau qui affiche toutes les données -->
    <div class="resultat_requete" id="resultat_requete" @scroll="handleScroll" :style="tailleDivResultatRequete" v-if="constructeurActuel===6">
    </div>
  </div>

</template>

<script setup>
import Constructeur4Bouton from "@/pages/constructeur/constructeur-4-bouton.vue";
import ConstructeurTableEtPropriete from "@/pages/constructeur/constructeur-table-et-propriete.vue";
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
import ConstructeurCondition from "@/pages/constructeur/constructeur-condition.vue";
import ConstructeurPropertyInsert from "@/pages/constructeur/constructeur-property-insert.vue";

import {reactive, ref, onMounted, onUnmounted} from "vue";
import ConstructeurValiderSansCondition from "@/pages/constructeur/constructeur-valider-sans-condition.vue"
import ConstructeurBoutonRetour from "@/pages/constructeur/constructeur-bouton-retour.vue";

import { sendRequest } from "../../../public/tools/requestDB";
import {stringifyQuery} from "vue-router";

/* déclarations des variables*/
const query = ref('')
const textCondition = ref()
const numId = ref()
const emits = defineEmits(['close-constructeur']);
let constructeurActuel = 0
let commande_selectionnee = 0
let table_selectionnee = ""
let propriete_selectionnee = ""
let etatBtnEnvoiRequete = true
let cle = ref(0)
let texteTitreSaisieID = ref()
let text_requete_temp = ""
let btnRetourIsDisabled = true
let historiqueTextRequete = []
let ajouterText = true
let inputIsNumber = ref()
let inputFocusRef = ref(null)
let btnRetourRequeteDeleteIsVisibled = ref(false)
let stockRequeteDelete = ""
let test1 = 0
let chercheIdDepuisDelete = true

const tailleDivResultatRequete = ref({
  height: '460px',
  width: '600px',
  borderTop: '1px solid white'
});

const styleTextArea = ref({
  height: '245px',
})

function focusInput(valeur) {
    if (valeur) {
      inputFocusRef.value.focus();
    }
}

function changeTailleTextarea(){
  tailleDivResultatRequete.value.height = '460px'
  tailleDivResultatRequete.value.maxHeight = '460px'
  tailleDivResultatRequete.value.overflow = 'auto'
  styleTextArea.value.height = '100px'
}

function changeEtatBtnEnvoiRequete(){
  etatBtnEnvoiRequete = false
}

/***
 * Ajoute la valeur passée en paramètre dans le texte area
 * pour la requête
 * @param valeur
 */
function addValeurToTextArea(valeur){
  text_requete_temp = valeur

  // si on se trouve dans la commande update alors la table sélectionnée change
  if (commande_selectionnee === 2 && constructeurActuel === 2){
    console.log(table_selectionnee)
    changeTableSelectionnee()
  } else {
    query.value += valeur
  }

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

  // ajoute la valeur du textarea dans l'historique pour
  // la fonction du bouton "retour"
  historiqueTextRequete.push(query.value)

  commandeSelectionee(valeur)
  addValeurToTextArea(valeur)
  console.log(constructeurActuel + " " + commande_selectionnee)
  console.log("constructeur actuel : "+constructeurActuel)
  console.log("texte temp : "+text_requete_temp)
  console.log(historiqueTextRequete)
  console.log("----------------------")
  constructeurActuel++
  btnRetourIsDisabled = false

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
  addValeurToTextArea(valeur)
  constructeurActuel = 6
  sendRequestFromConstructor()
}

/***
 * Teste si le champs de saisie de texte pour
 * la condition est vide ou non
 * Si oui : boite de dialogue s'affiche
 * Si non : On ajoute le texte au textarea de la requete
 *          et on incrément le constructeur actuel
 */
function testerInputText() {
  if (textCondition.value === ""){
    window.alert("Veuillez remplir le champs de saisie")
  } else {
    query.value += "'" + textCondition.value + "'"
    constructeurActuel++
    textCondition.value = ""
  }
}

/***
 * efface le contenu de l'input qui contient la requête
 * + celui du constructeur et remet le constructeur actuel à 0
 */
function handleScroll(){
  encadreActuel.parentNode.removeChild(encadreActuel);
  encadreActuel = null;
}
/***
 * efface le contenu de l'input qui contient la requête
 * + celui du constructeur et remet le constructeur actuel à 0
 */
function effacer(){

  if (test1 !== 1){
    //Supprimer l'ancienne table s'il en existe une
    let oldTable = document.getElementById("table_result");
    if (oldTable) {
      oldTable.remove();
    }
    // reset tout à 0
    query.value = ""
    textCondition.value = ""
    constructeurActuel = 0
    numId.value = ''

    historiqueTextRequete = []

    btnRetourIsDisabled = true
    encadreActuel.parentNode.removeChild(encadreActuel);
    encadreActuel = null;
    btnRetourRequeteDeleteIsVisibled = false

    changeTailleTextarea()
  }

}

/***
 * Fonction qui permet de retourner dans le constructeur précédent
 * en cas d'erreur de la part de l'utilisateur
 * Fonctionnement : ajouter le texte de la requête (query)
 *                  dans un tablea à chaque fois qu'on passe au
 *                  prochain constructeur (pas dans cette fonction).
 *                  Quand on clique sur le bouton, le constructeur actuel
 *                  se décrémente et le text de la requête change pour
 */
function retour(){
  console.log(historiqueTextRequete)
  query.value = historiqueTextRequete[constructeurActuel - 1]
  console.log(historiqueTextRequete[constructeurActuel])
  historiqueTextRequete.pop()
  numId.value = ""
  textCondition.value = ""

  constructeurActuel--
}

/***
 * Ajoute les propriétés lorsque la commande DELETE est choisi
 * @param valeur
 */
function proprieteDelete(valeur){
  /*** Fonctionnalité btn Retour ****/
  historiqueTextRequete.push(query.value)
  console.log(constructeurActuel + " " + commande_selectionnee)
  console.log("constructeur actuel : "+constructeurActuel)
  console.log("texte temp : "+text_requete_temp)
  console.log(historiqueTextRequete)
  console.log("----------------------")
  /******/

  commande_selectionnee = 4
  query.value += " FROM " + valeur
  constructeurActuel++
}

/**
 * Fonction qui permet de changer la variable "propriete_selectionnee"
 * avec la valeur passé en paramètre
 * @param valeur propriété actuellement sélectionnée
 */
function changeProprieteSelectionnee(valeur){
  propriete_selectionnee = valeur
  textCondition.value = ""
  changeLabel(valeur)
}

/***
 * Fonction qui change la table_selectionnee
 * avec la valeur passé en paramètre
 * @param valeur table_selectionnee
 */
function changeTableSelectionnee(valeur){
  table_selectionnee = valeur
  console.log(valeur)
}


/***
 * Fonction qui permet de changer le texte d'indication au dessus de l'input lors de la
 * saisie de la condition pour une requête SELECT et UPDATE.
 * Exemple pour SELECT : Saisissez le propriétaire, Saisissez l'ID (numéro) de la voiture
 * Exemple pour UPDATE : Saisissez le nouveau prénom, Saisissez le nouveau numéro de plaque
 * @param propriete_selectionnee Valeur émise lorsque l'on clique sur une propriété d'une table
 */
function changeLabel(propriete_selectionnee){

    // si la propriété sélectionnée est un ID des trois choix alors l'input sera en mode "number"
    inputIsNumber =  (propriete_selectionnee === "idVoiture" || propriete_selectionnee === "idPersonne" ||
        propriete_selectionnee === "idMateriel");

  let texteExplicationSaisie = "Saisissez "

  if (commande_selectionnee === 1) {
    switch (propriete_selectionnee) {
      case "idVoiture" : texteExplicationSaisie += "l'ID (numéro) de la voiture"; break;
      case "idPersonne" : texteExplicationSaisie += "l'ID (numéro) de la personne";  break;
      case "idMateriel" : texteExplicationSaisie += "l'ID (numéro) du matériel"; break;
      case "prénom" : texteExplicationSaisie += "le prénom :";  break;
      case "nom" : texteExplicationSaisie += "le nom";  break;
      case "date_de_naissance" : texteExplicationSaisie += "la date de naissance";  break;
      case "numéro_de_tel" : texteExplicationSaisie += "le numéro de téléphone";  break;
      case "couleur" : texteExplicationSaisie += "la couleur"; break;
      case "marque" : texteExplicationSaisie += "la marque"; break;
      case "propriétaire" : texteExplicationSaisie += "le propriétaire"; break;
      case "numéro_plaque": texteExplicationSaisie += "le numéro de plaque"; break;
      case "nom_matériel" : texteExplicationSaisie += "le nom du matériel"; break;
      case "quantité": texteExplicationSaisie += "la quantité"
    }
  } else if (commande_selectionnee === 2) {
    switch (propriete_selectionnee) {
      case "prénom" : texteExplicationSaisie += "le nouveau prénom :";  break;
      case "nom" : texteExplicationSaisie += "le nouveau nom";  break;
      case "date_de_naissance" : texteExplicationSaisie += "la nouvelle date de naissance (aaaa-mm-jj)";  break;
      case "numéro_de_tel" : texteExplicationSaisie += "le nouveau numéro de téléphone";  break;
      case "couleur" : texteExplicationSaisie += "la nouvelle couleur"; break;
      case "marque" : texteExplicationSaisie += "la nouvelle marque"; break;
      case "propriétaire" : texteExplicationSaisie += "le nouveau propriétaire"; break;
      case "numéro_plaque": texteExplicationSaisie += "le nouveau numéro de plaque"; break;
      case "nom_matériel" : texteExplicationSaisie += "le nouveau nom du matériel"; break;
      case "quantité": texteExplicationSaisie += "la nouvelle quantité"
    }
  }

  texteTitreSaisieID.value = texteExplicationSaisie
}

/***
 * Fonction qui convertit la table (chaine de caractère)
 * avec l'ID correspondant
 * @param table_selectionnee table sélectionnée
 * @returns {number|string} l'id de la table
 */
function convertId(table_selectionnee){
  switch (table_selectionnee) {
    case "tb_voiture" : return "idVoiture";
    case "tb_personne" : return "idPersonne";
    case "tb_materiel" : return "idMateriel";
    default: return -1;
  }
}

/***
 * Fonction qui permet de tester si le champ de saisie est valide selon la propriété choisie
 * @param commandeUpdate Boolean si la commande sélectionnée est UPDATE
 */
function valideRequete(commandeUpdate) {
  text_requete_temp = query.value

  // test si la propriété sélectionnée est l'ID de la table
  if (["idVoiture", "idPersonne", "idMateriel"].includes(propriete_selectionnee)) {
    if (Number.isInteger(parseInt(textCondition.value))) {
      addValeurToTextArea(textCondition.value);
    } else {
      window.alert("Vous devez saisir un nombre (ID)");
      return;
    }

    // test si la propriété sélectionnée est la date de naissance
    // est au bon format soit année-mois-jour
  } else if (propriete_selectionnee === "date_de_naissance") {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(textCondition.value)) {
      addValeurToTextArea(textCondition.value);
      constructeurActuel++
    } else {
      window.alert("Le format de la date doit être : aaaa-mm-jj");
      return;
    }

  } else {
    if (textCondition.value !== "") {
      if (commandeUpdate)  {
        historiqueTextRequete.push(query.value)
      }

      if (commande_selectionnee === 2 && constructeurActuel === 2){
        query.value += "'" + textCondition.value + "'" + " WHERE " + convertId(table_selectionnee) + " = "
      } else {
        query.value += "'";
        addValeurToTextArea(textCondition.value);
        query.value += "'";
      }

      console.log(query.value);
      constructeurActuel++
    } else {
      console.log("champs vide")
      window.alert("Vous ne pouvez pas insérer de chaîne vide");
      return;
    }
  }

  if (!commandeUpdate){
    constructeurActuel = 6
    query.value += ";"
    changeTailleTextarea()
    sendRequestFromConstructor()
  }

  etatBtnEnvoiRequete = false
  btnRetourIsDisabled = false

}

/***
 * Fonction qui permet de valider la saisie des input pour la requête
 * update et ensuite les ajouter les saisies au text area
 */
function valideRequeteUpdate() {
  console.log(numId.value)
  if (!isNaN(numId.value) && numId.value !== "" && numId.value >= 1) {

    query.value += numId.value
    constructeurActuel = 6
    query.value += ";"
    changeTailleTextarea()
    sendRequestFromConstructor()
  } else {
    window.alert("Vous devez saisir un nombre valide")
  }
}

/***
 * Fonction qui valide la requête quand l'utilisateur
 * clique sur "Valider sans filtre"
 */
function validerSansCondition(){
  constructeurActuel = 6
  query.value += ";"
  changeTailleTextarea()
  etatBtnEnvoiRequete = false
  sendRequestFromConstructor()
}

/***
 * Fonction qui exécute la fonction qui envoie la requête
 * en chaine de caractère STRING passé en paramètre de la fonction
 * "sendRequest"
 */
function sendRequestFromConstructor() {
  sendRequest(query.value);
}

function updateTextarea(info) {
  query.value = info;
}

window.addEventListener('updateTextareaEvent', (event) => {
  updateTextarea(event.detail);
});

/***
 * Fonction qui permet d'afficher les lettres d'un "string" passé
 * en paramètre une par une comme si on écrivait au clavier
 * @param inputText Text à afficher lettre après lettre
 */
const effetLettres = async (inputText) => {
  for (const letter of inputText) {
    ajouterText = false
    query.value += letter;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  ajouterText = true
}

/***
 * Emet le signal de la fermeture du constructeur quand on clique
 * sur la croix
 */
function close(){
  // emet false donc on affiche pas la fenetre
  emits('close-constructeur', true)
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@700&family=VT323&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@600');

/* Animation d'écriture du texte */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

*{
  margin: 0;
}

button{
  width: 30%;
  height: 40px;
  font-family: 'Leelawadee', sans-serif;

}

.constructeur {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  align-items: center;
  width: 600px;
}

#text-conditon{
  height: 50px;
}
.btnValider{
  background-color: #ffffff;
  color: black;
}

input {
  margin-right: 20px;
}
/* écran gauche */
.constructeur_app{
  background-color: black;
  width: 600px;
  height: 700px;
}
.text_requete textarea{
  resize: none;
  font-family: 'Jura', sans-serif;
  border: none;

}

/* Constructeur */
.constructeur{
  height: 300px;
  margin: auto;
}

/* Text requête */
.div_text_requete {
  width: 100%;
  border-top: white solid 1px;
}

#text-requete{
  width: 560px;
  font-size: 34px;
  font-family: 'Jura', sans-serif;
  font-weight: 600;
  color: #27FF16;
  margin: 0;
  background-color: black;
  border-bottom: transparent;
  border-top: transparent;
  padding: 15px;
  resize: none;
  border: none;
}
textarea:focus{
  border: none;
  outline: none;
}

.bouton_finaux button{
  width: 150px;
  margin-top: 30px;
}

/************** Bouton valide requête **************/
.btnValider{
  font-size: 18px;
  font-family: 'Jura', sans-serif;
  font-weight: bold;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  transition: transform 500ms ease;
}
.btnValider:hover {
  transform: scale(1.10);
}
/****************************************************/

.saisie_condition{
  display: inline-block;
  text-align: center;
}

/************** Saisie condition SELECT ********/
.condition_select{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.input_et_bouton{
  display: flex;
  align-items: center;
}
.text_indication_saisie{
  color: white;
  font-size: 32px;
  font-family: 'Jura', sans-serif;
  font-weight: 600;
  margin-bottom: 20px;
}
#text-conditon{
  height: 40px;
  width: 200px;
  border-radius: 20px;
  padding-left: 10px;
  font-size: 18px;
}

/***************** saisie id  DELETE et UPDATE***************************/
.saisie_condition_delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.text_saisie_id_et_input{
  display: flex;
  align-items: center;
}

.text_saisie_id{
  color: white;
  font-size: 32px;
  font-family: 'Jura', sans-serif;
  font-weight: 600;
  margin-bottom: 20px;
}

#num-id{
  height: 40px;
  width: 100px;
  border-radius: 20px;
  padding-left: 10px;
  font-size: 16px;
}

/*************************************************************************/

.bouton_finaux {
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 150px;
  height: 50px;
  border: #ffffff 2px solid;
  border-radius: 15px;
  background-color: black;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: white;
  transition: transform 500ms ease;
}

.bouton_finaux:hover{
  transform: scale(1.05);

}
.constructeur4bouton{
  margin-left: 20px;
}

.img_recommencer {
  width: 12%;
  margin-bottom: -7px;
  margin-left: 8px;
}

.img_retour {
  width: 20%;
  margin-bottom: -8px;
  margin-left: 5px;
}

.bouton_recommencer {
  width: 220px;
}

.constructeur_app {
  border: white 3px solid;
  user-select: none;
}

.barre-onglet {
//padding: 5px;
//margin: 5px;
  height: 30px;
  width: 600px;
  background-color: #222222;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
}
.nomAppConstructeur {
  color: white;
  font-family: 'Jura', sans-serif;
  font-size: 22px;
  font-weight: 500;
  padding-left: 10px;
}

.barre-onglet button {
  background-color: transparent;
  border: none;
  margin-top: -5px;
}

.minus, .close{
  height: 20px;
  width: 20px;
}
.square {
  height: 17px;
  width: 17px;
  margin-bottom: 2px;
}
.minus:hover, .close:hover {
  transform: scale(1.1);
  background-color: #28282f;
}

.square:hover {
  transform: scale(1.05);
}

.constructeur_table_et_propriete{
  margin: 0;
}
.btn_condition {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.btn_redirection {
  margin-bottom: 40px;
  width: 250px;
  height: 50px;
  border: #ffffff 2px solid;
  border-radius: 15px;
  background-color: black;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: white;
  transition: transform 500ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_redirection img {
  width: 7%;
  margin-top: 2px;
  margin-left: 10px;
}
.btn_redirection:hover {
  transform: scale(1.1);
}
</style>