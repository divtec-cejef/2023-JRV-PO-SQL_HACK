<template>
  <div class="page2">
    <ul class="table_voiture">
      <p>Voiture</p>
      <li v-for="(propriété, index) in voiture" :key="index" @click="clique(propriété)">
        {{ propriété }}
      </li>
    </ul>
    <ul class="table_personne">
      <p>Personne</p>
      <li>idPersonne</li>
      <li>Nom</li>
      <li>Prénom</li>
      <li>Date de naissance</li>
      <li>Numéro tel</li>
    </ul>
    <ul class="table_materiel">
      <p>Materiel</p>
      <li>idMatériel</li>
      <li>Nom</li>
      <li>Quantité</li>
    </ul>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const voiture = ["idVoiture", "Couleur", "Propriétaire", "Num plaque"]
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