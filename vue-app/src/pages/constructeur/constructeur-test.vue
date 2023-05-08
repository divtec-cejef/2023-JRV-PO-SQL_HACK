<template>
    <div class="page1">
      <button @click="nextPageSelect">SELECT</button>
      <button id="btn_update">UPDATE</button>
      <button id="btn_insert">INSERT</button>
      <button id="btn_delete">DELETE</button>
    </div>
    <div class="page2">
      <ul class="table_voiture">
        <p>Voiture</p>
        <li>idVoiture</li>
        <li>Couleur</li>
        <li>Propriétaire</li>
        <li>Numéro de plaque</li>
      </ul>
      <ul class="table_personnel">
        <p>Personnel</p>
        <li>idPersonnel</li>
        <li>Nom</li>
        <li>Prénom</li>
        <li>Date de naissance</li>
        <li>Numéro tel</li>
      </ul>
      <ul class="table_materiel">
        <p>Materiel</p>
        <li>idMatériel</li>
        <li>Nom</li>
        <li>Quantité</li>
      </ul>
    </div>
</template>

<script setup>
  function nextPageSelect(){
  }
</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}

/* page 1 */
.page1 {
  width: 500px;
  background-color: aqua;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.page1 button{
  border: none;
  font-size: 26px;
  margin: 20px;
  padding: 1em;
  border-radius: 20px;
}

button{
  transition: transform 500ms ease;
}
button:hover{
  transform: scale(1.1);
}


/* page 2 */
ul{
  padding: 0;
}
li{
  list-style-type: none;
  margin: 0;
}
.page2{
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: aquamarine;
  color: black;
}
p{
  margin-bottom: 30px;
  font-size: 32px;
  padding: 5px;
  font-weight: 600;
}

</style>