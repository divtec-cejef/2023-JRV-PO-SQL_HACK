<template>
  <div class="constructeur">
    <div class="bouton">
      <button>SELECT</button>
      <button>UPDATE</button>
      <button>INSERT</button>
      <button>DELETE</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
*{
  margin: 0;
  border: red solid 2px;
}
.constructeur{
  background-color: blue;
  width: fit-content;
  padding: 3em;
}

.constructeur button{
  border: none;
  font-size: 22px;
  margin: 20px;
  padding: 1em;
}
.bouton {
  background-color: aqua;
}
</style>