<template>
  <div class="page1">
    <button @click="addSelectToQuery(1)">SELECT</button>
    <button @click="addSelectToQuery(2)">UPDATE</button>
    <button @click="addSelectToQuery(3)">INSERT</button>
    <button @click="addSelectToQuery(4)">DELETE</button>
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
    switch (boutonSelectionne){
      case 1: emits('select', 'SELECT ')
        break
      case 2: emits('select', 'UPDATE ')
        break
      case 3: emits('select', "INSERT INTO ")
        break
      case 4: emits('select', 'DELETE ')
        break
    }
  }

</script>

<style scoped>
/* page 1 */
.page1 {
  width: 500px;
  background-color: aqua;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.page1 button{
  border: none;
  font-size: 26px;
  margin: 20px;
  padding: 1em;
  border-radius: 20px;
}

button{
  transition: transform 500ms ease;
}
button:hover{
  transform: scale(1.1);
}
</style>