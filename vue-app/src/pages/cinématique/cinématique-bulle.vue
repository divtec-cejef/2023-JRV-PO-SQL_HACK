<template>
  <div class="texte-bulle">
    <img src="../../img/bulle-texte.png" id="bulle" alt="">
    <p class="texte">{{message}}</p>
  </div>

</template>


<script setup>
import {ref} from "vue";

const props = defineProps(["message"])
</script>



<style scoped>
*{

}

.texte{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  color: #222222;
  width: 400px;
  padding-left: 90px;
  padding-bottom: 50px;
}

</style>