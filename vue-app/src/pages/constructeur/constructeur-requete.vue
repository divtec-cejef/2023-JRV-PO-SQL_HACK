<template>
  <textarea v-model="text"></textarea>
</template>

<script setup>
import {text} from "stream/consumers";
const props = defineProps(["text"])
</script>

<style scoped>

</style>