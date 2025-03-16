<script setup>
defineEmits(['close'])
</script>

<template>
    <div @click="$emit('close')" class="fixed inset-0 bg-black opacity-60 flex justify-center items-center z-50">
        <div @click.stop class="bg-white p-6 rounded-lg shadow-lg w-2/3 sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-2/5">
            <div class="text-2xl sm:text-3xl md:text-3xl mb-4 text-center">
                <slot name="header"></slot>
            </div>
            <div class="my-8 text-lg sm:text-lg md:text-xl leading-8 whitespace-pre-line">
                <slot name="content"></slot>
            </div>
            <button
                @click="$emit('close')"
                class="transition hover:bg-blue-700 py-1 px-4 bg-blue-600 rounded-lg text-white mt-2 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4">
                Close
            </button>
        </div>
    </div>
</template>

<style scoped></style>