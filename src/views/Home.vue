<script setup>
import Banner from '@/components/Banner.vue';
import ConcertManager from '@/components/ConcertManager.vue';

defineProps({
  isWrap: {
    type: Boolean,
    default: false
  }
})
</script>
 
<template>
<div>
    <Banner/>
    <ConcertManager :showAll="false" :isWrap="false"/>
</div>
</template>
 
<style scoped>

</style>