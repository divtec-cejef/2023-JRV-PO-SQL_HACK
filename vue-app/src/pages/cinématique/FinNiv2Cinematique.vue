
<template>
  <div class="MessageReussite" v-if="showFel">Merci, j'aurais jamais réussi sans toi !</div>
  <img class="image" src="../../img/Terminator.png"/>
  <div class="bouton-quitter" v-if="showContent">
   <button class="Quitter" @click="recommencer">Quitter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const showContent = ref(false);
const showFel = ref(false);

const recommencer = () => {
  window.location.reload();
};

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 1000); // Délai de 5 secondes

  setTimeout(() => {
    showFel.value = true;
  }, 1000); // Délai de 5 secondes
});
</script>

<style scoped>
.image{
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1920px;
  min-height: 1080px;
  max-width: 1920px;
  max-height: 1080px;
}
.MessageReussite{
  position: fixed;
  z-index: 3;
  color: #FFFFFF;
  font-size: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 200px;
  left: 20px;
  font-weight: bold;
}

.bouton-quitter{
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  top: 700px;
  left: 300px;
}
button{
  width: 420px;
  height: 210px;
  background-color: #ffffff;
  color: black;
  border: black solid 2px;
  border-radius: 15px;
  font-size: 40px;
  font-weight: bold;
}

button:hover {
  transform: scale(1.10);
}

.Quitter{
  position: fixed;
  left: 750px;
  margin-left: auto;
}
</style>