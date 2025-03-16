<script setup>
import ConcertManager from './components/ConcertManager.vue'
import TicketList from './components/TicketList.vue'
import UserManager from './components/UserManager.vue'
import Header from './components/Header.vue'
import ConcertDetail from './components/ConcertDetail.vue'
</script>

<template>
  <div>
    <Header />
    <UserManager />
    <ConcertManager />
    <ConcertDetail/>
  </div>
</template>

<style scoped></style>
