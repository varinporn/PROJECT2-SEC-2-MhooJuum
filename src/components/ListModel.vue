<script setup>
defineProps({
    items:{
        type: Array,
        require: true
    }
})
</script>
 
<template>
<div>
    <div>
        <slot name="header"></slot>
    </div>
    <div class="flex space-x-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div v-for="(item, index) in items" :key="index" class="min-w-[170px]">
            <slot name="yourItem" :itemInList="item"></slot>
        </div>
    </div>
</div>
</template>
 
<style scoped>

</style>