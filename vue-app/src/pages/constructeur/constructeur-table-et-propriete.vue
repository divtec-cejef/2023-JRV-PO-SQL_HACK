<template>
  <div class="label">Choisissez la {{ label }}</div>
    <div class="tables">
      <ul class="table_voiture" :class="{'disabled': disabledTableVoiture, 'ulHover': ulIsHover}" @click="addPropriety('*', 'tb_voiture')">
        <div :class="{'pHover': pIsHover}">Voiture</div>
        <li v-for="(propriete, index) in tb_voiture" :key="index" @click="addPropriety(tb_voiture[index], 'tb_voiture')"
        :class="{'liHover': liIsHover}">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_personne" :class="{'disabled': disabledTablePersonne, 'ulHover': ulIsHover}" @click="addPropriety('*', 'tb_personne')">
        <div :class="{'pHover': pIsHover}">Personne</div>
        <li v-for="(propriete, index) in tb_personne" :key="index" @click="addPropriety(tb_personne[index], 'tb_personne')" :class="{'liHover': liIsHover}" v-if="index !==0">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_materiel" :class="{'disabled': disabledTableMateriel, 'ulHover': ulIsHover}" @click="addPropriety('*', 'tb_materiel')">
        <div :class="{'pHover': pIsHover}">Materiel</div>
        <li v-for="(propriete, index) in tb_materiel" :key="index" @click="addPropriety(tb_materiel[index], 'tb_materiel')" :class="{'liHover': liIsHover}">
          {{ propriete }}
        </li>
      </ul>
  </div>

</template>

<script setup>
import {computed, onMounted, reactive, ref, resolveDirective} from "vue";
import {tr} from "faker/lib/locales";

// déclarations des 3 tableaux qui contiennent les "propriétés" des tables
const tb_voiture = ["idVoiture", "couleur", "marque", "propriétaire", "numéro_plaque"]
const tb_personne = ["idPersonne", "prénom", "nom", "date_de_naissance", "numéro_de_tel"]
const tb_materiel = ["idMateriel", "nom_matériel", "quantité"]


/***
 * Au lancement du composant, si isUpdate est "True", alors
 * on supprime le premier élément des listes (l'id) pour éviter de
 * pouvoir séléctionner l'ID
 */
if (props.isUpdate) {
  tb_personne.shift()
  tb_voiture.shift()
  tb_materiel.shift()
}

/* émet*/
const propriete = defineEmits(['propriete','propriete_selectionnee', 'table_selectionnee', 'focus_input'])
const props = defineProps(['where', 'commande', 'table', 'isUpdate', 'label', 'liIsHover', 'ulIsHover', 'pIsHover']);


// style de la table qui est indisponible
let disabledTableVoiture = false
let disabledTablePersonne = false
let disabledTableMateriel = false

let liIsHover = props.liIsHover
let ulIsHover = props.ulIsHover
let pIsHover = props.pIsHover

// Grise les tables qui n'ont pas été sélectionné précédement
switch (props.table) {
  case "tb_voiture":
    console.log("table voiture");
    disabledTableVoiture = false;
    disabledTablePersonne = true;
    disabledTableMateriel = true;
    break;
  case "tb_personne":
    console.log("table personne");
    disabledTableVoiture = true;
    disabledTablePersonne = false;
    disabledTableMateriel = true;
    break;
  case "tb_materiel":
    console.log("table materiel");
    disabledTableVoiture = true;
    disabledTablePersonne = true;
    disabledTableMateriel = false;
    break;
}

function convertId(table) {
  if (table === "tb_voiture") {
    return "idVoiture"
  } else if (table === "tb_personne") {
    return "idPersonne"
  } else if (table === "tb_materiel") {
    return "idMateriel"
  }
}

/**
 * Teste si le constructeur de la table est après
 * les 4 boutons ou après la condition
 * Mode après 4 boutons : idPersonne FROM personne
 * Mode après condition : Prénom =
 * @param valeur Propriété du tableau
 * @param table Nom du tableau
 */
function addPropriety(valeur, table) {

  // empêche de cliquer sur une propriété quand il faut juste sélectionner la table
  if ((valeur === "*" && props.where === true) || (valeur === "*" && props.commande === 2)) {
    return
  }

  let stringRequete = "";
  let props_select = valeur

  if (valeur === "propriétaire"){
    valeur = "proprietaire"
    props_select = "propriétaire"
  }

  stringRequete = " " + valeur

  // select
  if (props.commande === 1){
    // choix du filtre
    if (props.where) {
      // propriété de la table en cas de filtre
      stringRequete = " " + valeur + " = "
    } else {
      // * pour la première séléction de la table
      stringRequete =  " *" + " FROM " + table
    }

    // update
  } else if (props.commande === 2){
      stringRequete = " " + table + " SET " + valeur + " = " /* + " WHERE " + convertId(table) */

    // insert
  } else if (props.commande === 3) {
    stringRequete = " INTO " + table

    // delete
  } else if (props.commande === 4){
    stringRequete = " FROM " + table + " WHERE " + convertId(table) + " = "

  }

  propriete('propriete', stringRequete)
  propriete('propriete_selectionnee', props_select)
  propriete('table_selectionnee', table)
  propriete('focus_input', true)

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@400;500;600;700&display=swap');

ul {
  padding: 0 0 15px 0;
  width: 175px;
  transition: transform 500ms ease;
  /* mettre une bordure transparent pour empecher de déplacer
  les éléments lors du survole
   */
  border: 2px black solid;
  border-radius: 14px;
  background-color: white;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  margin: 8px;
  display: flex; /* Utilise Flexbox pour gérer le centrage */
  flex-direction: column; /* Affiche les éléments de la liste en colonne */
  align-items: center; /* Centre les éléments horizontalement */
  list-style: none; /* Supprime les puces de la liste */
}

ul p {
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  margin-top: 10px;
}

li {
  list-style-type: none;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  color: black;
  width: fit-content;
  padding: 5px;
}

.tables {
  display: flex;
  height: 240px;
}

ul div {
  margin-bottom: 5px;
  margin-top: 10px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
  font-family: 'Jura', sans-serif;
  color: black;
  text-align: center;
}
p:hover{
  color: #27FF16;
}

ul:hover {
  transform: scale(1.05);
}

.disabled{
  pointer-events: none;
  background-color: #cccccc;
  border: 0 white solid;
}
.label {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.liHover:hover {
  color: #27FF16;
}
.ulHover:hover{
  border: 2px #27FF16 solid;
}
.pHover:hover{
  color: #27FF16;
}

</style>