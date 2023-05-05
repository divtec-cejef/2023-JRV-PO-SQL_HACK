<script setup>

import CinématiqueBouton from "@/pages/cinématique/cinématique-bouton.vue";
import CinématiqueBulle from "@/pages/cinématique/cinématique-bulle.vue";



</script>

<template>
  <img src="../../img/garage-vu-dehors.jpg" id="image-fond" alt="">
  <img src="../../img/personnage.png" id="personnage" alt="">

  <div class="texte-bulle">
    <cinématique-bulle></cinématique-bulle>
  </div>
  <cinématique-bouton></cinématique-bouton>
  <RouterLink to="/">retour</RouterLink>


</template>

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

.texte-bulle{
  display: flex;
  justify-content: right;
  top: 100px;
}

</style>