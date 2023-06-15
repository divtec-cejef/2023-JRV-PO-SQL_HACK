<script setup>
import FormRequest from "@/components/FormRequest.vue";
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Chat from "@/chatBox/chat.vue";
</script>

<template>
  <header>

  </header>

  <main>

    <chat></chat>
    <FormRequest></FormRequest>

    <RouterLink to="/cinématique">Cinématique</RouterLink>
    <router-view/>

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
