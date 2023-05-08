<template>
  <div class="page1">
    <button @click="emitEvent">SELECT</button>
    <button id="btn_update">UPDATE</button>
    <button id="btn_insert">INSERT</button>
    <button id="btn_delete">DELETE</button>
  </div>
</template>

<script setup>
  import { defineEmits } from 'vue'
  const emits = defineEmits(['select'])
  function emitEvent(){
    emits('select', 'SELECT')
  }
</script>

<style scoped>
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
</style>