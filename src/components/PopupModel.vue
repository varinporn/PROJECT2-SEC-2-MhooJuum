<script setup>
    defineEmits(['close'])
</script>

<template>
    <div @click="$emit('close')" class="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div @click.stop >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped></style>