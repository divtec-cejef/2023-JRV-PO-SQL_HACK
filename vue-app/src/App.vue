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

<style>
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

/* Paramètres pour la totalité du tableau */
.table_result {
  width: max-content;
  margin: auto ;
  border-collapse: collapse ;
  background: white;
}

/* Paramètres pour les cellules classiques ET les cellules d'en-tête */
.table_result th, .table_result td {
  border: 1px solid #8f10ff ;
  padding: 5px ;
}

/* Paramètres pour les lignes d'en-tête uniquement */
.table_result thead tr {
  background-color: #8f10ff ;
  color: #ffffff ;
}

/* Paramètres pour les lignes de contenu */
.table_result tbody tr {
  background-color: #f2ecfe ;
}

/* Paramètres pour les lignes de contenu paires */
.table_result tbody tr:nth-child(2n) {
  background-color: #f9f6ff ;
}

/* Paramètres pour les lignes de contenu au survol de la souris */
.table_result tbody tr:hover {
  background-color: #5000a9 ;
  color: #ffffff ;
}
</style>
