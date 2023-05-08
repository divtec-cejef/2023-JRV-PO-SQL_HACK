<template>
    <div class="page1">
      <button @click="nextPageSelect">SELECT</button>
      <button id="btn_update">UPDATE</button>
      <button id="btn_insert">INSERT</button>
      <button id="btn_delete">DELETE</button>
    </div>
    <div class="page2">
      <div class="table_voiture">
        <button>idVoiture</button>
        <button>couleur</button>
        <button>propriétaire</button>
        <button>numéroPlaque</button>
      </div>
      <div class="table_personnel">
        <button>idPersonnel</button>
        <button>Nom</button>
        <button>Prénom</button>
        <button>Datenaissance</button>
        <button>Numéro de tel</button>
      </div>
      <div class="table_materiel">
        <button>idMatériel</button>
        <button>Nom</button>
        <button>Quantité</button>
      </div>
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
.page2{
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}


</style>