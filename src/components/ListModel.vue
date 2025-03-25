<script setup>
defineProps({
    items:{
        type: Array,
        require: true
    },
    isWrap: {
        type: Boolean,
        default: false
    },
    itemWidth: {
        type: Number,
        require: true
    }
})

</script>
 
<template>
<div>
    <div 
        class="flex space-x-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        :class="isWrap ? 'flex-wrap' : 'flex-nowrap'">
        <div v-for="(item, index) in items" :key="index" class="flex-shrink-0" :style="{ width: `${itemWidth}px` }">
            <slot name="yourItem" :itemInList="item"></slot>
        </div>
    </div>
</div>
</template>
 
<style scoped>

</style>