<template>
  <div class="page1">

      <button @click="addSelectToQuery(1)" class="btn1">Sélectionner</button>
      <button @click="addSelectToQuery(2)" class="btn2">Modifier</button>
      <button @click="addSelectToQuery(3)" class="btn3">Ajouter</button>
      <button @click="addSelectToQuery(4)" class="btn4">Supprimer</button>

  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['select'])


/***
 * Emet la chaîne de caractère d'une des 4 commandes
 * des boutons qui est sélectionnée par l'utilisateur
 * @param boutonSelectionnee Valeur du bouton sélectionner (de 1 à 4)
 */
  function addSelectToQuery(boutonSelectionnee){
  let valeur = ""
  console.log(valeur)
    switch (boutonSelectionnee){
      case 1: valeur = "SELECT"
        break
      case 2: valeur = "UPDATE"
        break
      case 3: valeur = "INSERT"
        break
      case 4: valeur = "DELETE"
        break
    }
  console.log(valeur)
  emits('select', valeur)
  }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700');

/* page 1 */
.page1 {
  width: 500px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

}

button{
  transition: transform 500ms ease;
  border: 2px solid white;
  font-size: 28px;
  margin: 15px;
  border-radius: 20px;
  background-color: black;
  color: white;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  width: 220px;
  height: 100px;
}
button:hover{
  transform: scale(1.1);
  border: #27FF16 solid 2px;

}
</style>