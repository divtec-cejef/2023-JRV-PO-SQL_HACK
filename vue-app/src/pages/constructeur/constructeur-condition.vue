<template>

  <div>
    <button @click="addWhere">Ajouter une condition +</button>
    <button @click="validerSansCondition">Valider sans condition</button>
  </div>

</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['where', 'sans-condition', 'valider_sans_condition'])
const props = defineProps(['propriete_selectionnee'])

/***
 * Emet la chaine de caractère WHERE pour
 * l'écrire dans l'input de la requête
 */
function addWhere(){
  emits('where', ' WHERE')
}

function validerSansCondition(){
  emits('valider_sans_condition', '')
}

</script>

<style scoped>
div{
  padding: 70px;
  text-align: center;
}
button {
  margin: 3px;
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