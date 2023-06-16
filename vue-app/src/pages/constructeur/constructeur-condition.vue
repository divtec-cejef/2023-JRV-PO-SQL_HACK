<template>
  <div>
    <button @click="addWhere">Ajouter une condition +</button>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['where', 'sans-condition'])
const props = defineProps(['propriete_selectionnee'])

/***
 * Emet la chaine de caractère WHERE pour
 * l'écrire dans l'input de la requête
 */
function addWhere(){
  emits('where', ' WHERE')
}

</script>

<style scoped>
div{
  padding: 110px;
}
button {
  font-size: 32px;
  width: fit-content;
  background-color: orange;
  color: white;
  padding: 20px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
}
button {
  transition: transform 500ms ease;
}
button:hover{
  transform: scale(1.1);
}
</style>