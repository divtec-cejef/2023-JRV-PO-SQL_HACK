<template>
  <div>
    <enfant @mon-evenement="maFonction"></enfant>
  </div>
</template>

<script setup>
import enfant from './enfant.vue';

function maFonction(valeur) {
  console.log(valeur); // Affiche "hello" dans la console
  // Appeler la fonction souhaitée avec la valeur en tant qu'argument
}
</script>