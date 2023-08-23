<template>
  <button @click="decrement">Retour</button>
</template>

<script setup>
const emits = defineEmits(['btn-retour'])
const props = defineProps(['constructeur_actuel'])

function decrement(){
  let constActu = props.constructeur_actuel
  constActu--
  console.log(constActu)
  emits('btn-retour', constActu)
  // if (props.constructeur_actuel !== 0){
  //   console.log(props.constructeur_actuel)
  //   emits("btn-retour", props.constructeur_actuel--)
  // }
}

</script>

<style scoped>

</style>