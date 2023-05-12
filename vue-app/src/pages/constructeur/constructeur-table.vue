<template>
  <div>
    <div class="page2">
      <ul class="table_voiture">
        <p @click="propriétéInsert(' Voiture')">Voiture</p>
      </ul>
      <ul class="table_personne">
        <p @click="propriétéInsert(' Personne')">Personne</p>
      </ul>
      <ul class="table_materiel">
        <p @click="propriétéInsert(' Matériel')">Materiel</p>
      </ul>
    </div>
  </div>
</template>

<script setup>
const propriete = defineEmits(['propriete'])
const props = defineProps(['table'])


function propriétéInsert(valeur){
  valeur += " VALUES "
  propriete('propriete', valeur)
}

</script>

<style scoped>
ul {
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
}

li {
  list-style-type: none;
}

.page2 {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: aquamarine;
  color: black;
}

p {
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
}

ul:hover {
  border: 1px yellow solid;
  transform: scale(1.05);

}

li:hover {
  color: yellow;
}
</style>