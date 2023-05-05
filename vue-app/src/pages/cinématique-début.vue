<template>

  <img src="src/img/garage-vu-dehors.jpg" id="image-fond" alt="">
  <img src="src/img/personnage.png" id="personnage" alt="">
  <img src="src/img/bulle-texte.png" id="bulle-texte" alt="">

  <div> {{ $props.data.texte }}</div>

  <RouterLink to="/">retour</RouterLink>

  <div class="test">test</div>


</template>

<script setup>

</script>

<style scoped>

* {
  margin: 0;
}

img {
  width: 100%;
  height: 100%;
}

#image-fond{
  /* Fixe l'image en haut à gauche de la page */
  position: fixed;
  top: 0;
  left: 0;
  /* Préserve le ratio de l'image */
  min-width: 100%;
  min-height: 100%;
}

#personnage{
  width: 220px;
  height: 460px;
  position: fixed;
  left: 35%;
  bottom: 8%;
}

#bulle-texte{
  width: 40%;
  height: 230px;
  position: fixed;
  left: 43%;
  bottom: 45%;
}

</style>