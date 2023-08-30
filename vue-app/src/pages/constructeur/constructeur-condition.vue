<template>

  <div>
    <button @click="addWhere">Ajouter un filtre + </button>
    <button @click="validerSansCondition" v-if="etat">Valider sans filtre</button>
  </div>

</template>

<script setup>
import {defineEmits, ref} from 'vue'
const emits = defineEmits(['where', 'sans-condition', 'valider_sans_condition'])
const props = defineProps(['etat'])


/***
 * Emet la chaine de caractère WHERE pour
 * l'écrire dans l'input de la requête
 */
function addWhere(){
  emits('where', ' WHERE')
}

function validerSansCondition(){
  emits('valider_sans_condition', 'sans_condition')
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@600');

div{
  padding: 50px;
  text-align: center;
}
button {
  margin: 3px;
  font-size: 32px;
  width: fit-content;
  background-color: #8f10ff;
  color: white;
  padding: 20px;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
}
button {
  transition: transform 500ms ease;
  margin-bottom: 10px;
}
button:hover{
  transform: scale(1.1);
}
</style>