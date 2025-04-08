<script setup>
import Banner from '@/components/Banner.vue';
import ConcertManager from '@/components/ConcertManager.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

defineProps({
  isWrap: {
    type: Boolean,
    default: false
  }
})
</script>
 
<template>
<div>
    <Header/>
    <Banner/>
    <ConcertManager :showAll="false" :isWrap="false"/>
    <Footer/>
</div>
</template>
 
<style scoped>

</style>