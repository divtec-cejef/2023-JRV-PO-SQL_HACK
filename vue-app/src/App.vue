<script setup>
import FormRequest from "@/components/FormRequest.vue";
import Constructeur from "@/pages/constructeur/constructeur.vue";
import Chat from "@/chatBox/chat.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
import ComponentsMessagerie from "@/chatBox/ComponentsMessagerie.vue";
import {ref} from "vue";

let ecranJeu = ref(false)
let cinematique = ref(true)
let cle = ref(0)

function changerEcran(valeur){
  console.log(valeur)
  ecranJeu = valeur
  cinematique = false
  cle.value += 1
}

</script>

<template>
  <header>

  </header>

  <main>

    <cinématique @changement-ecran="changerEcran" v-if="cinematique" :key="cle"></cinématique>
    <div v-if="ecranJeu" class="ecran_hackeur">

      <div class="barre_lateral_gauche">
        <h1>Comment ça fonctionne ?</h1>
        <p>Pour interagir avec la base de données, on utilise un langage informatique qui s’appelle le <strong>SQL</strong>.
          Ce langage permet d’utiliser 4 commandes pour exécuter des requêtes sur une base de données.</p>

        <h2>Les 4 commandes </h2>
        <p><strong>SELECT</strong> sert à sélectionner et afficher certaines informations de la base de données
          qui correspondent aux champs que vous aurez choisi.</p>
        <p><strong>UPDATE</strong> sert à modifier une information précise qui se trouve dans la base de données. Pour y arriver,
          il suffit de choisir le champ sur lequel vous voulez faire votre modification, saisir votre nouvelle information,
          saisir l’ID pour appliquer la modification sur une information précise de la base de données. </p>
        <p><strong>INSERT</strong> sert à insérer une nouvelle information dans la base de données.
          Pour y arriver, il suffit de choisir où vous voulez l’insérer et remplir chaque champ de saisie proposé.</p>
        <p><strong>DELETE</strong> sert à supprimer une information qui se trouve dans la base de données.
          Pour y arriver, il suffit choisir où se trouve l’information et saisir l’ID pour savoir quelle information précise vous voulez supprimer.</p>
        <p><strong>L'ID</strong> est un nombre unique que chaque information possède. Ce numéro est utilisé pour permettre d’identifier une information.</p>

      </div>
      <div class="constructeur">
        <constructeur></constructeur>
      </div>
      <div class="chat_box">
<!--          <chat class="chat"></chat>-->
       <ComponentsMessagerie></ComponentsMessagerie>
      </div>

    </div>

  </main>
</template>

<style>

header {
  line-height: 1.5;
}

.barre_lateral_gauche{
  background-color: #8f10ff;
  width: 20%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px;
  font-family: 'Lato', sans-serif;
  text-align: justify;
  box-shadow: 0 0 5px 0 black;

}

.constructeur{
  margin-left: 500px;
  margin-top: 50px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.chat_box {
  margin-left: 200px;
}


.animation_descente {
  animation: descend 1s ease-in-out;
  position: relative;
}

.animation_cote {
  animation: arrive 1s ease-in-out;
  position: relative;
}

/* Définition de l'animation 'descend' */
@keyframes descend {
  from {
    top: -200px; /* Position initiale en haut de la fenêtre */
  }
  to {
    top: 0; /* Position finale, la div est affichée en bas */
  }
}

/* Définition de l'animation 'arrive' */
@keyframes arrive {
  from {
    left: 200px /* Position initiale complètement à droite de la fenêtre */
  }
  to {
    left: 0; /* Position finale, la div est affichée à gauche */
  }
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
  width: 100%;
  margin: auto ;
  border-collapse: collapse ;
  background: white;
}

/* Paramètres pour les cellules classiques ET les cellules d'en-tête */
.table_result th, .table_result td {
  border: 1px solid #000000 ;
  padding: 5px ;
}

/* Paramètres pour les lignes d'en-tête uniquement */
.table_result th {
  background-color: #8f10ff ;
  color: #ffffff ;
}


/* Paramètres pour les lignes de contenu paires */
.table_result tr:not(:first-child):nth-child(even){
  background-color: lightgray;
}

.table_result td:hover {
  background-color: #8f10ff ;
  color: #ffffff;
}

.ecran_hackeur {
  display: flex;
}

.chat {
  align-self: flex-end;
}

h1, h2 {
  color: #ffffff;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 24px;
}

p {
  color: #ffffff;
  font-size: 16px;
}

</style>
