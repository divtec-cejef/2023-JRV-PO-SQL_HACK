<template>
  <video class="video" autoplay muted playsinline @ended="passerVideo">
    <source src="@/video/video_demo.mp4" type="video/webm" />
  </video>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emits = defineEmits(['VideoExemple']);

function passerVideo(){
  emits('VideoExemple', true);
}

</script>

<style scoped>
.video{
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1900px;
  min-height: 1000px;
  max-width: 1920px;
  max-height: 1080px;
}
</style>