

<template>
  <div class="MessageReussite">Bravo, tu as réussi !</div>
    <video class="video" autoplay muted playsinline>
      <source src="@/video/fini.mp4" type="video/webm" />
    </video>
  <div class="bouton-quitter-rec" v-if="showContent">
   <button class="Niveau2">Niveau 2</button>
   <button class="Quitter" @click="recommencer">Quitter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showContent = ref(false);

const recommencer = () => {
  window.location.reload();
};

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 5000); // Délai de 5 secondes
});
</script>

<style scoped>
.video{
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1920px;
  min-height: 1080px;
  max-width: 1920px;
  max-height: 1080px;
  z-index: -1;
}

.MessageReussite{
  position: fixed;
  z-index: 1;
  color: #FFFFFF;
  font-size: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 200px;
  left: 20px;
  font-weight: bold;
}

.bouton-quitter-rec{
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  top: 700px;
  left: 300px;
}
button{
  width: 320px;
  height: 150px;
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

.Niveau2{
  margin-right: auto;
}

.Quitter{
  position: fixed;
  left: 1300px;
  margin-left: auto;
}
</style>