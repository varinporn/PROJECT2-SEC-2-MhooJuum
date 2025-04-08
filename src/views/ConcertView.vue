<script setup>
import ConcertManager from '@/components/ConcertManager.vue';
import Footer from '@/components/Footer.vue';

defineProps({
  isWrap: {
    type: Boolean,
    default: false
  }
})
</script>
 
<template>
<div>
    <ConcertManager :showAll="true" :isWrap="true"/>
    <Footer/>
</div>
</template>
 
<style scoped>

</style>