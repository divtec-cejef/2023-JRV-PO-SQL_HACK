<template>
  <div>
    <button @click="validerSansCondition">Valider sans condition</button>
  </div>
</template>

<script setup>

const define = defineEmits(['valider-sans-condition'])

function validerSansCondition(){
  define("valider-sans-condition", true)
}

</script>

<style scoped>

</style>