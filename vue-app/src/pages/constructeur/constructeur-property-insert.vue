<template>

  <ul v-if="table()===0">
    <li> {{ tb_voiture[0] }} <input type="text" v-model="idVoiture"></li>
    <li> {{ tb_voiture[1] }} <input type="text" v-model="couleur"></li>
    <li> {{ tb_voiture[2] }} <input type="text" v-model="marque"></li>
    <li> {{ tb_voiture[3] }} <input type="text" v-model="propriétaire"></li>
    <li> {{ tb_voiture[4] }}<input type="text" v-model="numéro_plaque"></li>
  </ul>

  <ul v-if="table()===1">
    <li> {{ tb_personne[0] }} <input type="text" v-model="idPersonne"></li>
    <li> {{ tb_personne[1] }}<input type="text" v-model="nom"></li>
    <li> {{ tb_personne[2] }}<input type="text" v-model="prénom"></li>
    <li> {{ tb_personne[3] }} <input type="text" v-model="date_de_naissance"></li>
    <li> {{ tb_personne[4] }} <input type="text" v-model="numéro_de_tel"></li>
  </ul>

  <ul v-if="table()===2">
    <li> {{ tb_materiel[0] }}<input type="text" v-model="idMateriel"></li>
    <li> {{ tb_materiel[1] }} <input type="text" v-model="nom_matériel"></li>
    <li> {{ tb_materiel[2] }} <input type="text" v-model="quantité"></li>
  </ul>

  <button @click="addValuesForInsert">Valider</button>
</template>

<script setup>

/* déclarations des 3 tableau pour les propriété des tables*/
import {computed, ref} from "vue";

const tb_voiture = ["idVoiture", "couleur", "marque", "propriétaire", "numéro_plaque"]
const tb_personne = ["idPersonne", "nom", "prénom", "date_de_naissance", "numéro_de_tel"]
const tb_materiel = ["idMateriel", "nom_matériel", "quantité"]

let inputValue = ref()
let idVoiture = ref()
let couleur = ref()
let marque = ref()
let propriétaire = ref()
let numéro_plaque = ref()
let idPersonne = ref()
let nom = ref()
let prénom = ref()
let date_de_naissance = ref()
let numéro_de_tel = ref()
let idMateriel = ref()
let nom_matériel = ref()
let quantité = ref()

const props = defineProps(['table'])
const define = defineEmits(['datainsert'])


/***
 * Fonction qui permet de retourner un nombre qui correspond à la
 * table sélectionnée, soit:
 * 0 : table Voiture
 * 1 : table Personne
 * 2 : table Matériel
 * @returns {number} Le nombre qui correspond à la table sélectionnée
 */
function tableSelectionnee(){
  if (props.table === "Voiture"){
    return 0
  } else if (props.table === "Personne"){
    return 1
  } else {
    return 2
  }
}

/***
 * Affiche un window alert qui avertis l'utilisateur qu'il
 * faut remplir TOUS les champs
 */
function windowAlert(){
  window.alert("Vous devez remplir les champs")
}

/***
 * Fonction qui teste si les champs de saisie sont remplis ou non
 * à l'aide d'un switch
 * "Return!" permet de retourner faux si les champs ne sont pas remplis
 * @returns {boolean} True si les champs sont remplis
 *                    False si les champs ne sont pas remplis
 */
function testChampsSaisieInput() {
  switch (tableSelectionnee) {
    case 0:
      return !(
          typeof idVoiture.value === "undefined" ||
          typeof couleur.value === "undefined" ||
          typeof marque.value === "undefined" ||
          typeof propriétaire.value === "undefined" ||
          typeof numéro_plaque.value === "undefined"
      );

    case 1:
      return !(
          typeof idPersonne.value === "undefined" ||
          typeof nom.value === "undefined" ||
          typeof prénom.value === "undefined" ||
          typeof date_de_naissance.value === "undefined" ||
          typeof numéro_de_tel.value === "undefined"
      );

    case 2:
      return !(
          typeof idMateriel.value === "undefined" ||
          typeof nom_matériel.value === "undefined" ||
          typeof nom_matériel.value === "undefined"
      );

    default:
      return true;
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

  if (testChampsSaisieInput()) {
    switch (tableSelectionnee) {
      case 0:
        insertion_data = `'${idVoiture.value}', '${couleur.value}', '${marque.value}', '${propriétaire.value}', '${numéro_plaque.value}')`;
        break;

      case 1:
        insertion_data = `'${idPersonne.value}', '${nom.value}', '${prénom.value}', '${date_de_naissance.value}', '${numéro_de_tel.value}')`;
        break;

      case 2:
        insertion_data = `'${idMateriel.value}', '${nom_matériel.value}', '${quantité.value}')`;
        break;

      default:
        break;
    }
    // émet les values pour l'insértion
    define('datainsert', ` VALUES (${insertion_data}`);
  } else {
    windowAlert();
  }

}

</script>

<style scoped>
ul{
  list-style-type: none;
  padding: 0;
}
li{
  margin: 0;
}
button{
  font-size: 32px;
}
</style>