<template>
  <div class="page2">
    <ul class="table_voiture">
      <p>Voiture</p>
      <li v-for="(propriété, index) in voiture" :key="index" @click="addPropriety(voiture[index], 'Voiture')">
        {{ propriété }}
      </li>
    </ul>
    <ul class="table_personne">
      <p>Personne</p>
      <li v-for="(propriété, index) in personne" :key="index" @click="addPropriety(personne[index], 'Personne')">
        {{ propriété }}
      </li>
    </ul>
    <ul class="table_materiel">
      <p>Materiel</p>
      <li v-for="(propriété, index) in materiel" :key="index" @click="addPropriety(materiel[index], 'Matériel')">
        {{ propriété }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";

/* déclarations des 3 tableau pour les propriété des tables*/
const voiture = ["idVoiture", "Couleur", "Propriétaire", "Num plaque"]
const personne = ["idPersonne", "Nom", "Prénom", "Date de naissance", "Numéro de tel"]
const materiel = ["idMateriel", "Nom", "Quantité"]

/* émet "propriété" */
const propriete = defineEmits(['propriete'])
/* si la table est après l'ajout d'une condition ou non*/
const props = defineProps(['where'])

function addPropriety(valeur, table) {
  if (props.where) {
    valeur = valeur + " = "
  } else {
    valeur = valeur + " FROM " + table
  }

  propriete('propriete', valeur)
}

</script>

<style scoped>
/* page 2 */
ul {
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
}

li {
  list-style-type: none;
}

.page2 {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: aquamarine;
  color: black;
}

p {
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
}

ul:hover {
  border: 1px yellow solid;
  transform: scale(1.05);

}

li:hover {
  color: yellow;
}

</style>