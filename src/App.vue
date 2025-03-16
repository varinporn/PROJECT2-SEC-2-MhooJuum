<script setup>
import ConcertManager from './components/ConcertManager.vue'
import TicketList from './components/TicketList.vue'
import UserManager from './components/UserManager.vue'
import Header from './components/Header.vue'
import ConcertDetail from './components/ConcertDetail.vue'
  import { ref } from 'vue';
  import Login from './components/Login.vue';
  const showLogin = ref(false)
</script>

<template>
  <div>
    <Header />
    <UserManager />
    <ConcertManager />
    <ConcertDetail/>
  </div>
  <div>
    <button @click="showLogin = !showLogin">
    Login
    </button>
    <Login v-show="showLogin" />  
  </div>
</template>

<style scoped></style>
