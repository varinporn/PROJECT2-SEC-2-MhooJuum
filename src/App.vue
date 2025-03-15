<script setup>
import {ref} from 'vue'
import PopupModel from './components/PopupModel.vue';

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
</script>
 
<template>
<div> 
  <button @click="toggleModal">hey</button>
  <PopupModel v-if="showModal" @close="toggleModal">
    <template #header>
      Your Ticket
    </template>
    <template #content>
      fdsfa
    </template>
  </PopupModel> 
</div>
</template>
 
<style scoped>

</style>