
<template>
  <!-- Écran de gauche qui contient : constructeur, texte requête
 et le résultat de la requête-->



  <div class="ecran_gauche">

    <div class="barre-onglet">
      <div class="button_fenetre">
        <button><img src="../../assets/icon/minus.png" alt="" class="minus"></button>
        <button><img src="../../assets/icon/square.png" alt="" class="square"></button>
        <button @click="close" ><img src="../../assets/icon/close.png" alt="" class="close"></button>
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
            <div v-if="constructeurActuel === 4" class="saisie_condition_select">

              <div class="condition_select">
                <div class="text_indication_saisie">{{ texteTitreSaisieID }}</div>
                <div class="input_et_bouton">
                  <!-- input pour la saisie d'un nombre (id)-->
                  <input type="number" id="text-conditon" v-model="textCondition" placeholder="Ecrire ici" class="text_condition_select"
                         @keydown.enter.prevent="valideRequete(false)" v-if="inputIsNumber" autocomplete="off">
                  <!-- input pour la saisie d'un texte -->
                  <input type="text" id="text-conditon" v-model="textCondition" placeholder="Ecrire ici" class="text_condition_select"
                         @keydown.enter.prevent="valideRequete(false)" v-if="!inputIsNumber" autocomplete="off">
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
                                            @table_selectionnee="changeTableSelectionnee" :is-update="true"></ConstructeurTableEtPropriete>
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
              <div class="saisie_condition_delete">
                <div class="text_saisie_id_et_input">
                  <div class="text_saisie_id">Saisissez l'id :</div>
                </div>
                <div>
                  <input type="number" id="num-id" v-model="numId" placeholder="ID" class="text_condition"
                         @keydown.enter.prevent="valideRequeteUpdate" autocomplete="off">
                  <button class="btnValider" @click="valideRequeteUpdate">Exécuter la requête</button>
                </div>

              </div>
            </div>
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
                :value="text_requete" :style="styleTextArea" readonly></textarea>
    </div>


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

import { sendRequest } from "@/tools/requestDB";
import {stringifyQuery} from "vue-router";

/* déclarations des variables*/
const textareaContent = ref('');
const text_requete = ref('')
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


const tailleDivResultatRequete = ref({
  height: '300px',
  width: '600px',
  borderTop: '1px solid white'
});

const styleTextArea = ref({
  height: '245px',
})

function changeTailleTextarea(){
  tailleDivResultatRequete.value.height = '478px'
  tailleDivResultatRequete.value.maxHeight = '478px'
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
function addValeurToTextRequete(valeur){
  text_requete_temp = valeur
  if (constructeurActuel === 0){
    text_requete.value = ""
  }

  text_requete.value += valeur
  // ajouterLettresAvecEffet(valeur)
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

  historiqueTextRequete.push(text_requete.value)

  commandeSelectionee(valeur)
  addValeurToTextRequete(valeur)
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
  addValeurToTextRequete(valeur)
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
    text_requete.value += "'" + textCondition.value + "'"
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


  //Supprimer l'ancienne table s'il en existe une
  let oldTable = document.getElementById("table_result");
  if (oldTable) {
    oldTable.remove();
  }
  // reset tout à 0
  text_requete.value = ""
  textCondition.value = ""
  constructeurActuel = 0
  numId.value = ''

  historiqueTextRequete = []
  
  tailleDivResultatRequete.value.height = '200px'
  btnRetourIsDisabled = true
  encadreActuel.parentNode.removeChild(encadreActuel);
  encadreActuel = null;
}

/***
 * Fonction qui permet de retourner dans le constructeur précédent
 * en cas d'erreur de la part de l'utilisateur
 * Fonctionnement : ajouter le texte de la requête (text_requete)
 *                  dans un tablea à chaque fois qu'on passe au
 *                  prochain constructeur (pas dans cette fonction).
 *                  Quand on clique sur le bouton, le constructeur actuel
 *                  se décrémente et le text de la requête change pour
 */
function retour(){

  console.log(historiqueTextRequete)
  text_requete.value = historiqueTextRequete[constructeurActuel - 1]
  console.log(historiqueTextRequete[constructeurActuel])
  historiqueTextRequete.pop()
  numId.value = ""
  textCondition.value = ""

  constructeurActuel--
}

function proprieteInsert(valeur) {
  text_requete_temp = text_requete.value

  /*** Fonctionnalité btn Retour ****/
  historiqueTextRequete.push(text_requete.value)
  console.log(constructeurActuel + " " + commande_selectionnee)
  console.log("constructeur actuel : "+constructeurActuel)
  console.log("texte temp : "+text_requete_temp)
  console.log(historiqueTextRequete)
  console.log("----------------------")
  /******/

  commande_selectionnee = 3;
  text_requete.value += " INTO " + valeur;
  table_selectionnee = valeur;
  constructeurActuel++;
  btnRetourIsDisabled = false
}

/***
 * Ajoute les propriétés lorsque la commande DELETE est choisi
 * @param valeur
 */
function proprieteDelete(valeur){
  /*** Fonctionnalité btn Retour ****/
  historiqueTextRequete.push(text_requete.value)
  console.log(constructeurActuel + " " + commande_selectionnee)
  console.log("constructeur actuel : "+constructeurActuel)
  console.log("texte temp : "+text_requete_temp)
  console.log(historiqueTextRequete)
  console.log("----------------------")
  /******/

  commande_selectionnee = 4
  text_requete.value += " FROM " + valeur
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
  changeTextEnCasDeID(valeur)
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

function changeTextEnCasDeID(propriete_selectionnee){
    if (propriete_selectionnee === "idVoiture" || propriete_selectionnee === "idPersonne" ||
        propriete_selectionnee === "idMateriel"){
      inputIsNumber = true;
    } else {
      inputIsNumber = false
    }

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
 * Fonction qui permet de tester le champs de saisie de la condition
 * @param commande si la commande correspond au constructeur actuel update
 */
function valideRequete(commandeUpdate) {
  text_requete_temp = text_requete.value

  if (["idVoiture", "idPersonne", "idMateriel"].includes(propriete_selectionnee)) {
    if (Number.isInteger(parseInt(textCondition.value))) {
      addValeurToTextRequete(textCondition.value);
    } else {
      window.alert("Vous devez saisir un nombre (ID)");
      return;
    }
  } else if (propriete_selectionnee === "date_de_naissance") {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(textCondition.value)) {
      addValeurToTextRequete(textCondition.value);
      constructeurActuel++
    } else {
      window.alert("Le format de la date doit être : aaaa-mm-jj");
      return;
    }
  } else {
    if (textCondition.value !== "") {
      if (commandeUpdate)  {
        historiqueTextRequete.push(text_requete.value)
        console.log(constructeurActuel + " " + commande_selectionnee)
        console.log("constructeur actuel : "+constructeurActuel)
        console.log("texte temp : "+text_requete_temp)
        console.log(historiqueTextRequete)
        console.log("----------------------")
      }
      console.log("champs rempli")
      text_requete.value += "'";
      addValeurToTextRequete(textCondition.value);
      text_requete.value += "'";
      console.log(text_requete.value);
      constructeurActuel++
    } else {
      console.log("champs vide")
      window.alert("Vous ne pouvez pas insérer de chaîne vide");
      return;
    }
  }

  if (!commandeUpdate){
    constructeurActuel = 6
    text_requete.value += ";"
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
    if (commande_selectionnee !== "DELETE") {
      text_requete.value += " WHERE "
    }
    switch (table_selectionnee) {
      case "tb_personne":
        text_requete.value += "idPersonne"
        break
      case "tb_voiture":
        text_requete.value += "idVoiture"
        break
      case "tb_materiel":
        text_requete.value += "idMateriel"
        break
    }
    text_requete.value += " = " + numId.value
    constructeurActuel = 6
    text_requete.value += ";"
    changeTailleTextarea()
    sendRequestFromConstructor()
  } else {
    window.alert("Vous devez saisir un nombre valide")
  }
}

/***
 * Fonction qui valide la requête
 */
function validerSansCondition(){
  constructeurActuel = 6
  text_requete.value += ";"
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
  sendRequest(text_requete.value);
}


function updateTextarea(info) {
  console.log("lala");
  text_requete.value = info;
}

window.addEventListener('updateTextareaEvent', (event) => {
  updateTextarea(event.detail);
});


const effetLettres = async (inputText) => {
  for (const letter of inputText) {
    ajouterText = false
    text_requete.value += letter;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  ajouterText = true
}

function ajouterLettresAvecEffet(valeur) {
  if (ajouterText) {
    effetLettres(valeur)
  } else {
    text_requete.value = text_requete_temp
  }
}

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
div{

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
.ecran_gauche{
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
  width: 588px;
  font-size: 32px;
  font-family: 'Jura', sans-serif;
  font-weight: 600;
  color: #27FF16;
  margin: 0;
  background-color: black;
  border-bottom: transparent;
  border-top: transparent;
  padding: 5px 5px 10px 5px;
  resize: none;
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
  padding-bottom: 15px;
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
}

.bouton_finaux:hover{
  transform: scale(1.10);
  transition: transform 500ms ease;
  border: #27FF16 1px solid;
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

.ecran_gauche {
  border: white 3px solid;
  user-select: none;
}

.barre-onglet {
//padding: 5px;
//margin: 5px;
  height: 30px;
  width: 600px;
  background-color: #cccccc;
  display: flex;
  padding-top: 3px;
  justify-content: flex-end;
  border-bottom: 2px solid white;
}

.barre-onglet button {
  background-color: transparent;
  border: none;
  margin-top: -5px;
  padding: 0 5px 0 12px;
}

.minus, .square, .close{
  height: 20px;
  width: 20px;
}
.titre_text_area{
  color: white;
  font-family: 'Jura', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-left: 2%;
}

</style>