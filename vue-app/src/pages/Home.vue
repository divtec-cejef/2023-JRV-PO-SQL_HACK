<script setup>

import FormRequest from "@/components/FormRequest.vue";
import Constructeur from "@/App.vue";



</script>

<template>
  <header>
  </header>

  <main>

    <RouterLink to="/cinématique">Cinématique</RouterLink>
    <router-link to="/constructeur-test">ConstructeurTest</router-link>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
