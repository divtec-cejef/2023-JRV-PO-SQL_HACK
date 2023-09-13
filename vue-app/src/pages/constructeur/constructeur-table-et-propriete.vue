<template>
  <div class="page2">
    <div class="tables">
      <ul class="table_voiture" :class="{'disabled': disabledTableVoiture}">
        <p>Voiture</p>
        <li v-for="(propriete, index) in tb_voiture" :key="index" @click="addPropriety(tb_voiture[index], 'tb_voiture')">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_personne" :class="{'disabled': disabledTablePersonne}">
        <p>Personne</p>
        <li v-for="(propriete, index) in tb_personne" :key="index" @click="addPropriety(tb_personne[index], 'tb_personne')" v-if="index !==0">
          {{ propriete }}
        </li>
      </ul>
      <ul class="table_materiel" :class="{'disabled': disabledTableMateriel}">
        <p>Materiel</p>
        <li v-for="(propriete, index) in tb_materiel" :key="index" @click="addPropriety(tb_materiel[index], 'tb_materiel')">
          {{ propriete }}
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import {computed, onMounted, reactive, ref, resolveDirective} from "vue";

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
const props = defineProps(['where', 'commande', 'table', 'isUpdate']);

// style de la table qui est indisponible
let disabledTableVoiture = false
let disabledTablePersonne = false
let disabledTableMateriel = false

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
  if (valeur === "propriétaire"){
    valeur = "proprietaire"
  }
  let props_select = valeur
  /* Test pour savoir si on a choisit SELECT*/
  valeur = " " + valeur
  if (props.commande === 1){
    if (props.where) {
      valeur = valeur + " = "
    } else {
      valeur =  valeur + " FROM " + table
    }
  } else if (props.commande === 2){
    if (props.where) {
      valeur = valeur + " = "
    } else {
      valeur = " " + table + " SET" + valeur + " = "
    }
  } else if (props.commande === 4){
    valeur = valeur + " = "
  }

  propriete('propriete', valeur)
  propriete('propriete_selectionnee', props_select)
  propriete('table_selectionnee', table)

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@600');

ul {
  padding: 0 0 15px 0;
  width: 160px;
  border: 1px black solid;
  transition: transform 500ms ease;
  border-radius: 14px;
  background-color: white;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  margin: 10px;

}

ul p {
  font-family: 'Lato', sans-serif;
}

li {
  list-style-type: none;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: black;
  margin: 8px;
}

.tables {
  width: fit-content;
  display: flex;
  color: black;
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
  transform: scale(1.10);
}

li:hover{
  color: #27FF16;
}

.disabled{
  pointer-events: none;
  background-color: #cccccc;
}


</style>