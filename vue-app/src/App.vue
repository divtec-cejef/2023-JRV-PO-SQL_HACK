<script setup>

import FormRequest from "@/components/FormRequest.vue";

</script>

<template>
  <header>

  </header>

  <main>
    <FormRequest></FormRequest>
    <RouterLink to="/cinématique">Cinématique</RouterLink>
    <Router-link to="/constructeur-test">ConstructeurTest</Router-link>
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
    //padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
