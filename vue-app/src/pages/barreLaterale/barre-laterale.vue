<script setup>

</script>

<template>
  <div class="barre_lateral_gauche">
    <!--        <img class="logo" src="../src/img/logo-sqlhack.png" alt="">-->
    <h1>Comment ça fonctionne ?</h1>
    <p>Pour interagir avec la base de données, on utilise un langage informatique qui s’appelle le SQL.
      Ce langage permet d’utiliser 4 commandes pour exécuter des requêtes sur une base de données.</p>

    <h2>Les 4 commandes </h2>
    <p>SELECT est utilisée pour sélectionner et afficher certaines données dans votre base de données.</p>
    <p>UPDATE est utilisée pour modifier des données existantes dans votre base de données.</p>
    <p>INSERT est utilisée pour ajouter une nouvelle donnée dans votre base de données
      sous forme d’une nouvelle ligne dans votre tableau.</p>
    <p>DELETE est utilisée pour supprimer une donnée dans votre base de données.</p>
    <p>L'ID est un nombre unique que chaque information possède. Ce numéro est utilisé pour permettre d’identifier une information.</p>
  </div>
</template>

<style scoped>
.barre_lateral_gauche {
  //background-color: #cccccc;
  width: 23%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 30px 0 0 30px;
  text-align: justify;
  //box-shadow: 0 0 5px 0 black;
  //border-top-right-radius: 15px;
}

h1, h2 {
  color: #ffffff;
}

h1 {
  font-size: 30px;
  padding-top: 35px;
}

h2 {
  font-size: 24px;
}

p {
  color: #ffffff;
  //color: #000000;
  font-size: 16px;
}

</style>