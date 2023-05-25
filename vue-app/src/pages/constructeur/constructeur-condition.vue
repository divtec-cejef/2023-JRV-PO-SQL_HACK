<template>
  <div>
    <button @click="addWhere">Ajouter une condition +</button>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['where'])

/***
 * Emet la chaine de caractère WHERE pour
 * l'écrire dans l'input de la requête
 */
function addWhere(){
  emits('where', ' WHERE ')
}
</script>

<style scoped>
div{
  padding: 30px;
}
button {
  font-size: 32px;
  width: fit-content;
  background-color: orange;
  color: white;
  padding: 20px;
  border-radius: 20px;
}

button {
  transition: transform 500ms ease;
}
button:hover{
  transform: scale(1.1);
}
</style>