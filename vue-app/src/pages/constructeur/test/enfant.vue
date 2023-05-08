<template>
  <button @click="emitEvent">Cliquer ici</button>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['mon-evenement']);

function emitEvent() {
  // Déclencher un événement personnalisé nommé "mon-evenement"
  // et transmettre la valeur "hello" en tant qu'argument
  emits('mon-evenement', 'hello');
}
</script>