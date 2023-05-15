<template>
  <ul>
    <li v-for="i in data[test()].length - 1" :key="i">{{ data[test()][i] }}
      <input type="text" :id="'id-' + data[test()]" ref="myInputs"></li>
  </ul>
  <button @click="dataInsert">Valider</button>
</template>

<script setup>
/* déclarations des 3 tableau pour les propriété des tables*/
import {ref} from "vue";

const voiture = ["idVoiture", "Couleur", "Propriétaire", "Num plaque"]
const personne = ["idPersonne", "Nom", "Prénom", "Date de naissance", "Numéro de tel"]
const materiel = ["idMateriel", "Nom", "Quantité"]
const data = [voiture, personne, materiel]

const props = defineProps(['table'])
let tableSelectionnee = ref()
let valueInsert = ref()

function test(){
  if (props.table === "Voiture"){
    tableSelectionnee = 0
  }else if (props.table === "Personne"){
    tableSelectionnee = 1
  } else {
    tableSelectionnee = 2
  }
  return tableSelectionnee
}

function dataInsert(){
  console.log(valueInsert.value)
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