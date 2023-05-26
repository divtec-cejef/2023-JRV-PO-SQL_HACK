<template>
  <div class="page2">
    <ul class="table_voiture">
      <p>Voiture</p>
      <li v-for="(propriete, index) in tb_voiture" :key="index" @click="addPropriety(tb_voiture[index], 'tb_voiture')">
        {{ propriete }}
      </li>
    </ul>
    <ul class="table_personne">
      <p>Personne</p>
      <li v-for="(propriete, index) in tb_personne" :key="index" @click="addPropriety(tb_personne[index], 'tb_personne')">
        {{ propriete }}
      </li>
    </ul>
    <ul class="table_materiel">
      <p>Materiel</p>
      <li v-for="(propriete, index) in tb_materiel" :key="index" @click="addPropriety(tb_materiel[index], 'tb_materiel')">
        {{ propriete }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";

/* déclarations des 3 tableau pour les propriété des tables*/
const tb_voiture = ["idVoiture", "couleur", "marque", "propriétaire", "numéro_plaque"]
const tb_personne = ["idPersonne", "nom", "prénom", "date_de_naissance", "numéro_de_tel"]
const tb_materiel = ["idMateriel", "nom_matériel", "quantité"]

/* émet*/
const propriete = defineEmits(['propriete'])
const props = defineProps(['where', 'commande'])

/**
 * Teste si le constructeur de la table est après
 * les 4 boutons ou après la condition
 * Mode après 4 boutons : idPersonne FROM personne
 * Mode après condition : Prénom =
 * @param valeur Propriété du tableau
 * @param table Nom du tableau
 */
function addPropriety(valeur, table) {
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
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
  background-color: white;
}

li {
  list-style-type: none;
  margin: 5px;
}

.page2 {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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