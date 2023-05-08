<template>
  <div class="page2">
    <ul class="table_voiture">
      <p>Voiture</p>
      <li v-for="(propriété, index) in voiture" :key="index" @click="clique(voiture[index])">
        {{ propriété }}
      </li>
    </ul>
    <ul class="table_personne">
      <p>Personne</p>
      <li v-for="(propriété, index) in personne" :key="index" @click="clique(personne[index])">
        {{ propriété }}
      </li>
    </ul>
    <ul class="table_materiel">
      <p>Materiel</p>
      <li v-for="(propriété, index) in materiel" :key="index" @click="clique(materiel[index])">
        {{ propriété }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const voiture = ["idVoiture", "Couleur", "Propriétaire", "Num plaque"]
  const personne = ["idPersonne", "Nom", "Prénom", "Date de naissance", "Numéro de tel"]
  const materiel = ["idMateriel", "Nom", "Quantité"]
  const emits = defineEmits(['propriete'])
  function clique(valeur){
    emits('propriete', valeur)
    console.log(valeur)
  }

</script>

<style scoped>
/* page 2 */
ul{
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
}
li{
  list-style-type: none;
}
.page2{
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: aquamarine;
  color: black;
}
p{
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
}
ul:hover{
  border: 1px yellow solid;
  transform: scale(1.05);

}
li:hover{
  color: yellow;
}

</style>