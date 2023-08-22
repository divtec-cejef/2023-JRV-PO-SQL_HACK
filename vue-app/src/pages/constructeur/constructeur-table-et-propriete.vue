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
import {computed, reactive, ref, resolveDirective} from "vue";

/* déclarations des 3 tableau pour les propriété des tables*/
const tb_voiture = ["idVoiture", "couleur", "marque", "propriétaire", "numéro_plaque"]
const tb_personne = ["idPersonne", "nom", "prénom", "date_de_naissance", "numéro_de_tel"]
const tb_materiel = ["idMateriel", "nom_matériel", "quantité"]

/* émet*/
const propriete = defineEmits(['propriete','propriete_selectionnee', 'table_selectionnee'])
const props = defineProps(['where', 'commande', 'table']);

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
ul {
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
  background-color: white;
  border-radius: 14px;
}

li {
  list-style-type: none;
  margin: 5px;
  font-family: 'Roboto', sans-serif;
}

.tables {
  width: fit-content;
  display: flex;
  color: black;

}

p {
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

ul:hover {
  border: 1px yellow solid;
  transform: scale(1.05);
}

li:hover {
  color: yellow;
}

.disabled{
  pointer-events: none;
  color: gray;
}

</style>