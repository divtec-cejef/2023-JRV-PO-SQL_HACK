<template>
  <div>
    <div class="page2">
      <ul class="table_voiture">
        <p @click="emitsTableSelectionnee('tb_voiture')">tb_voiture</p>
      </ul>
      <ul class="table_personne">
        <p @click="emitsTableSelectionnee('tb_personne')">tb_personne</p>
      </ul>
      <ul class="table_materiel">
        <p @click="emitsTableSelectionnee('tb_materiel')">tb_materiel</p>
      </ul>
    </div>
  </div>
</template>

<script setup>
const propriete = defineEmits(['propriete', 'props-delete'])
const props = defineProps(['table'])

function emitsTableSelectionnee(valeur){
  propriete('propriete', valeur)
  propriete('props-delete', valeur)
}

</script>

<style scoped>
ul {
  padding: 0;
  margin: 20px;
  border: 1px black solid;
  transition: transform 500ms ease;
  background-color: white;
}

li {
  list-style-type: none;
  background-color: white;
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

ul:hover {
  border: 1px yellow solid;
  transform: scale(1.05);

}

li:hover {
  color: yellow;
}
</style>