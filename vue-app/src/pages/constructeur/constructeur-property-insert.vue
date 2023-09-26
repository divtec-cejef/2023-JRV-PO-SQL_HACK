<template>
  <div id="property-insert">
    <div class="saisie_property_insert">
      <ul v-if="tableSelectionnee()===0">
        <li> {{ tb_voiture[0] }} <input type="text" v-model="id" readonly  @click="addValuesForInsert"></li>
        <li> {{ tb_voiture[1] }} <input type="text" v-model="couleur"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_voiture[2] }} <input type="text" v-model="marque"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_voiture[3] }} <input type="text" v-model="proprietaire"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_voiture[4] }} <input type="text" v-model="numero_plaque"  @keydown.enter.prevent="addValuesForInsert"></li>
      </ul>

      <ul v-if="tableSelectionnee()===1" class="saisie_property_insert_tb_personne">
        <li> {{ tb_personne[0] }} <input type="text" v-model="id" readonly  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_personne[1] }}<input type="text" v-model="nom"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_personne[2] }}<input type="text" v-model="prenom"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_personne[3] }} <input type="text" v-model="date_de_naissance"  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_personne[4] }} <input type="text" v-model="numero_de_tel"  @keydown.enter.prevent="addValuesForInsert"></li>
      </ul>

      <ul v-if="tableSelectionnee()===2">
        <li> {{ tb_materiel[0] }}<input type="text" v-model="id" readonly  @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_materiel[1] }} <input type="text" v-model="nom_materiel" @keydown.enter.prevent="addValuesForInsert"></li>
        <li> {{ tb_materiel[2] }} <input type="text" v-model="quantite"  @keydown.enter.prevent="addValuesForInsert"></li>
      </ul>
    </div>

    <div class="bouton_valider">
      <button @click="addValuesForInsert">Envoyer la requête</button>
    </div>
  </div>

</template>

<script setup>

/* déclarations des 3 tableau pour les propriété des tables*/
import {ref} from "vue";

const tb_voiture = ["idVoiture", "couleur", "marque", "proprietaire", "numero_plaque"]
const tb_personne = ["idPersonne", "nom", "prenom", "date_de_naissance", "numero_de_tel"]
const tb_materiel = ["idMateriel", "nom_materiel", "quantite"]

let id = "null"
let couleur = ref()
let marque = ref()
let proprietaire = ref()
let numero_plaque = ref()
let nom = ref()
let prenom = ref()
let date_de_naissance = ref()
let numero_de_tel = ref()
let nom_materiel = ref()
let quantite = ref()

const props = defineProps(['table'])
const define = defineEmits(['datainsert', 'changeTailleTextarea', 'etatBtnEnvoiRequete'])


/***
 * Fonction qui permet de retourner un nombre qui correspond à la
 * table sélectionnée, soit :
 * 0 : table Voiture
 * 1 : table Personne
 * 2 : table Matériel
 * @returns {number} Le nombre qui correspond à la table sélectionnée
 */
function tableSelectionnee(){
  if (props.table === "tb_voiture"){
    return 0
  } else if (props.table === "tb_personne"){
    return 1
  } else if (props.table === "tb_materiel"){
    return 2
  }
}

/***
 * Affiche un window alert qui avertis l'utilisateur qu'il
 * faut remplir TOUS les champs
 */
function windowAlert(message){
  window.alert(message)
}

/***
 * Fonction qui teste si les champs de saisie sont remplis ou non
 * à l'aide d'un switch
 * Permet de retourner faux si les champs ne sont pas remplis
 * @returns {boolean} True si les champs sont remplis
 *                    False si les champs ne sont pas remplis
 */
function testChampsSaisieInput() {
  let table_selectionnee = tableSelectionnee()
  switch (table_selectionnee) {
    case 0:
      // Si les champs sont vides on retourne faux sinon si les champs
      // sont remplis et que la date est valide on retourne true, la requête
      // est donc juste
      if (typeof couleur.value === "undefined" || typeof marque.value === "undefined" ||
          typeof proprietaire.value === "undefined" || typeof numero_plaque.value === "undefined") {
        windowAlert("Vous devez remplir les champs")
        return false

      }
      return true

    case 1:
      if (!nom.value || !prenom.value || !date_de_naissance.value || !numero_de_tel.value) {
        windowAlert("Vous devez remplir tous les champs");
      } else {
        if (!dateNaissanceIsValidate(table_selectionnee)) {
          alert("Le format de la date de naissance doit être : aaaa-mm-jj");
          return false;
        }
        if (!Number.isInteger(parseInt(numero_de_tel.value))) {
          alert("Le numéro de téléphone doit être un nombre");
          return false;
        }
        return true;
      }
      break

    case 2:
      if (typeof nom_materiel.value === "undefined" || typeof quantite.value === "undefined") {
        windowAlert("Vous devez remplir les champs")
      } else {
        return true
      }
  }
}

/***
 * Fonction qui teste d'abord si les champs de saisie sont remplis pour :
 * Si oui : retourner et émettre les values d'insertion de la requête INSERT
 * Si non : afficher une window alert qui avertis l'utilisateur qu'il faut
 *          saisir les champs
 */
function addValuesForInsert() {
  let insertion_data = "";
  let table_selectionnee = tableSelectionnee()

  if (testChampsSaisieInput()) {
    switch (table_selectionnee) {
      case 0:
        insertion_data = `${id}, '${couleur.value}', '${marque.value}', '${proprietaire.value}', '${numero_plaque.value}')`;
        break;

      case 1:
        insertion_data = `${id}, '${nom.value}', '${prenom.value}', ${date_de_naissance.value}, ${numero_de_tel.value})`;
        break;

      case 2:
        insertion_data = `${id}, '${nom_materiel.value}', '${quantite.value}')`;
        break;

      default:
        break;
    }
    insertion_data += ";"
    // émet les values pour l'insértion
    define('datainsert', ` VALUES (${insertion_data}`);
  }

  define("changeTailleTextarea", true)
  define('etatBtnEnvoiRequete', false)
}

/***
 * Fonction qui teste si le format est bel et bien
 * correspondant au format suivant : année-mois-jour
 */
function dateNaissanceIsValidate(table_selectionnee){
    //    aaaa/mm/dd
    if (table_selectionnee === 1){
      const regex = /^\d{4}-\d{2}-\d{2}$/
      return regex.test(date_de_naissance.value)
    }
}
</script>

<style scoped>

#property-insert{

}
.saisie_property_insert{
  width: 430px;
}
.saisie_property_insert_tb_personne{
  width: 500px;
  margin-left: -30px;
}
ul{
  list-style-type: none;
  padding: 0;
}
li{
  color: white;
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  font-family: 'Jura', sans-serif;
  font-weight: 500;
}
input{
  font-size: 18px;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  height: 30px;
  width: 150px;
}
button:hover{
  transition: transform 500ms ease;
  transform: scale(1.10);
}
.bouton_valider {
  display: flex;
  justify-content: center;
}
.bouton_valider button {
  font-size: 18px;
  font-family: 'Jura', sans-serif;
  font-weight: bold;
  width: fit-content;
  padding: 10px;
  border-radius: 8px;
  transition: transform 500ms ease;
}
</style>