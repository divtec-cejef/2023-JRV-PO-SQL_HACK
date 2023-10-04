
<template>
  <div class="MessageReussiteNiv2" v-if="showFel">Merci, j'aurais jamais réussi sans toi !</div>
  <img class="image" src="../../img/Terminator.png"/>
  <div class="bouton-quitterNiv2" v-if="showContent">
   <button class="QuitterNiv2" @click="recommencer">Quitter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const showContent = ref(false);
const showFel = ref(false);

/**
 * Reload la page pour recommencer
 */
const recommencer = () => {
  window.location.reload();
};

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 1000);

  setTimeout(() => {
    showFel.value = true;
  }, 1000);
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
.MessageReussiteNiv2{
  position: fixed;
  z-index: 3;
  color: #FFFFFF;
  font-size: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 200px;
  left: 20px;
  font-weight: bold;
}

.bouton-quitterNiv2{
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  top: 770px;
  left: 735px;
  margin-left: auto;
}
.QuitterNiv2{
  width: 280px;
  height: 120px;
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

</style>