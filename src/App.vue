<script setup>
  import { ref } from 'vue';
  import Login from './components/Login.vue';
  const showLogin = ref(false)
</script>
 
<template>
  <button @click="showLogin = !showLogin">
    Login
  </button>
  <Login v-show="showLogin" />
</template>
 
<style scoped>

</style>