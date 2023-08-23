<template>
  <div>
    <div class="page2">
      <button @click="emitsTableSelectionnee('tb_voiture')" class="table_voiture">tb_voiture</button>
      <button @click="emitsTableSelectionnee('tb_personne')" class="table_voiture">tb_personne</button>
      <button @click="emitsTableSelectionnee('tb_materiel')" class="table_voiture">tb_materiel</button>
    </div>
  </div>
</template>

<script setup>
const propriete = defineEmits(['propriete', 'props-delete'])
const props = defineProps(['table'])

/***
 * Fonction qui permet d'émettre la valeur passer en paramètre
 * dans le constructeur principal
 * @param valeur nom de la table passé en paramètre dans le code html
 */
function emitsTableSelectionnee(valeur){
  propriete('propriete', valeur)
  propriete('props-delete', valeur)
}

</script>

<style scoped>
button {
  padding: 30px;
  margin: 20px;
  font-size: 32px;
  transition: transform 500ms ease;
  background-color: white;
  border-radius: 20px;
}

.page2 {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: black;
}

p {
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
}

button:hover {
  border: 1px yellow solid;
  transform: scale(1.05);

}

li:hover {
  color: yellow;
}
</style>