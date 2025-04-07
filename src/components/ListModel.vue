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
        type: String,
        require: true
    },
    isCol: {
        type: Boolean,
        default: false
    }
})

</script>
 
<template>
<div>
    <div 
        class=" mt-4 flex gap-8 overflow-x-auto overflow-y-hidden "
        :class="isWrap ? 'flex-wrap' : 'flex-nowrap', isCol ? 'max-md:flex-col items-center' : 'flex-row'"    
    >
        <div v-for="(item, index) in items" :key="index" class="flex-shrink-0 pb-4" :class="itemWidth">
            <slot name="yourItem" :itemInList="item"></slot>
        </div>
    </div>
</div>
</template>
 
<style scoped>

</style>