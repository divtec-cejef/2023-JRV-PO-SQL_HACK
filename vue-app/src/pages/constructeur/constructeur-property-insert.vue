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
import {ref} from "vue";

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
let tableSelectionnee = ref()

function table(){
  if (props.table === "Voiture"){
    tableSelectionnee = 0
  }else if (props.table === "Personne"){
    tableSelectionnee = 1
  } else {
    tableSelectionnee = 2
  }
  return tableSelectionnee
}

function windowAlert(){
  window.alert("Vous devez remplir les champs")
}

function addValuesForInsert(){
  let insertion_data = ""
  if(tableSelectionnee === 0){
    if (idVoiture === "" || couleur === "" || marque === "" ||
        propriétaire === "" || numéro_plaque === ""){
      windowAlert()
    } else {
      insertion_data = "'" + idVoiture.value + "', " + "'" + couleur.value + "', " +
          "'" + marque.value + "', " + "'" + propriétaire.value + "', " +
          "'" + numéro_plaque.value + "') "
    }

  } else if (tableSelectionnee === 1){
    if (idPersonne === "" || nom === "" || prénom === "" ||
        date_de_naissance === "" || numéro_de_tel === ""){
        windowAlert()
    } else {
      insertion_data = "'" + idPersonne.value + "', " + "'" + nom.value + "', " +
          "'" + prénom.value + "', " + "'" + date_de_naissance.value + "', " +
          "'" + numéro_de_tel.value + "') "
    }

  } else if (tableSelectionnee === 2){
    if (idMateriel === "" || nom_matériel === "" || quantité === ""){
      windowAlert()
    } else {
      insertion_data =  "'" + idMateriel.value + "', " + "'" + nom_matériel.value + "', " +
          "'" + quantité.value + "') "
    }
  }

  // émition de la valeur d'insertion des données
  define('datainsert', " VALUES (" + insertion_data)
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