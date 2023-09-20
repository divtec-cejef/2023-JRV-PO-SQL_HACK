<template>
  <div class="label">Choisissez la {{ label }}</div>
    <div class="tables">
      <ul class="table_voiture" :class="{'disabled': disabledTableVoiture}" @click="addPropriety('*', 'tb_voiture')">
        <p>Voiture</p>
        <li v-for="(propriete, index) in tb_voiture" :key="index" @click="addPropriety(tb_voiture[index], 'tb_voiture')"
        :class="{'liHover': liIsHover}">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_personne" :class="{'disabled': disabledTablePersonne}" @click="addPropriety('*', 'tb_personne')">
        <p>Personne</p>
        <li v-for="(propriete, index) in tb_personne" :key="index" @click="addPropriety(tb_personne[index], 'tb_personne')" v-if="index !==0">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_materiel" :class="{'disabled': disabledTableMateriel}" @click="addPropriety('*', 'tb_materiel')">
        <p>Materiel</p>
        <li v-for="(propriete, index) in tb_materiel" :key="index" @click="addPropriety(tb_materiel[index], 'tb_materiel')">
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
const propriete = defineEmits(['propriete','propriete_selectionnee', 'table_selectionnee'])
const props = defineProps(['where', 'commande', 'table', 'isUpdate', 'label', 'isHover']);


// style de la table qui est indisponible
let disabledTableVoiture = false
let disabledTablePersonne = false
let disabledTableMateriel = false

let liIsHover = props.isHover

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

/**
 * Teste si le constructeur de la table est après
 * les 4 boutons ou après la condition
 * Mode après 4 boutons : idPersonne FROM personne
 * Mode après condition : Prénom =
 * @param valeur Propriété du tableau
 * @param table Nom du tableau
 */
function addPropriety(valeur, table) {

  if ((valeur === "*" && props.where === true) || (valeur === "*" && props.commande === 2)) {
    return
  }

  if (valeur === "propriétaire"){
    valeur = "proprietaire"
  }
  let props_select = valeur
  valeur = " " + valeur

  // select
  if (props.commande === 1){
    // choix du filtre
    if (props.where) {
      // propriété de la table en cas de filtre
      valeur = valeur + " = "
    } else {
      // * pour la première séléction de la table
      valeur =  " *" + " FROM " + table
    }

    // update
  } else if (props.commande === 2){
    if (props.where) {
      valeur = valeur + " = "
    } else {
      valeur = " " + table + " SET" + valeur + " = "
    }

    // delete
  } else if (props.commande === 4){
    valeur = valeur + " = "
  }

  propriete('propriete', valeur)
  propriete('propriete_selectionnee', props_select)
  propriete('table_selectionnee', table)

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@400;500;600;700&display=swap');

ul {
  padding: 0 0 15px 0;
  width: 175px;
  border: 1px black solid;
  transition: transform 500ms ease;
  border-radius: 14px;
  background-color: white;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  margin: 8px;
}
ul:hover{
  border: #27FF16 3px solid;
}

ul p {
  font-family: 'Jura', sans-serif;
  font-weight: 700;
}

li {
  list-style-type: none;
  text-align: center;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  color: black;
  margin: 8px;
}

.tables {
  display: flex;
  height: 240px;
}

p {
  margin-bottom: 5px;
  margin-top: 20px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: black;
  text-align: center;
}

ul:hover {
  transform: scale(1.05);
}

.disabled{
  pointer-events: none;
  background-color: #cccccc;
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

</style>