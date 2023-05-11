<template>
  <div>
    <button @click="addWhere">Ajouter une condition +</button>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
import ConstructeurTable from "@/pages/constructeur/constructeur-table.vue";
const emits = defineEmits(['where'])
function addWhere(){
  emits('where', ' WHERE')
}
</script>

<style scoped>
div{
  padding: 30px;
}
button {
  font-size: 32px;
  width: fit-content;
  background-color: blue;
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