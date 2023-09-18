<template>
  <div class="page1">
    <button @click="addSelectToQuery(1)" class="btn1">SELECT</button>
    <button @click="addSelectToQuery(2)" class="btn2">UPDATE</button>
    <button @click="addSelectToQuery(3)" class="btn3">INSERT</button>
    <button @click="addSelectToQuery(4)" class="btn4">DELETE</button>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['select'])


/***
 * Emet la chaîne de caractère d'une des 4 commandes
 * des boutons
 * @param boutonSelectionne Valeur du bouton sélectionner (de 1 à 4)
 */
  function addSelectToQuery(boutonSelectionne){
  let valeur = ""
  console.log(valeur)
    switch (boutonSelectionne){
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
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@600');

/* page 1 */
.page1 {
  width: 500px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.page1 button{
  border: 2px solid white;
  font-size: 28px;
  margin: 15px;
  border-radius: 20px;
  padding: 30px;
  background-color: black;
  color: white;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
}

button{
  transition: transform 500ms ease;
}
button:hover{
  transform: scale(1.1);
  border: #27FF16 solid;
}
</style>