<template>
  <button
      class="btnContinuer"
      @click="nextText"
  >Continuer</button>
</template>

<script setup>
const nombre = 0
const tableau_texte = ['Salut', 'Pinto', 'Le', 'Plus', 'Fort', 'Rosaria']
function nextText() {
  return nombre
}
</script>

<style scoped>
.btnContinuer{
  color: white;
  background-color: orange;
  width: 20%;
  height: 70px;
  border: none;
  font-size: 38px;
  font-weight: bold;
  border-radius: 20px;
  position: relative;
  left: 90%;
  top: 400px;
}
</style>