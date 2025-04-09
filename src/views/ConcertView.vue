<script setup>
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
    <ConcertManager :showAll="true" :isWrap="true"/>
</div>
</template>
 
<style scoped>

</style>