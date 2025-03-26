<script setup>
import PopupModel from './PopupModel.vue';
defineEmits(['close', 'accept'])
const props = defineProps({
    message: {
        type: Object,
    }
})
</script>
<template>
    <PopupModel @close="$emit('close')">
        <div class="bg-white w-250 min-h-60 flex flex-col p-8 rounded-2xl ">
            <div class="self-end">
                <button @click="$emit('close')">X</button>
            </div>
            <div class="self-center text-4xl font-bold mb-8">
                <slot name="header"></slot>
                {{ props.message.header }}
            </div>
            <div class="self-center text-xl flex-grow">
                <slot name="content"></slot>
                {{ props.message.content }}
            </div>
            <div class="self-end justify-self-end mt-16 flex gap-8">
                <button @click="$emit('accept')" class="border border-[#5fd1ff] text-[#5fd1ff] px-4 py-2 rounded-2xl">
                    <slot name="accept"></slot>
                    {{ props.message.accept }}
                </button>
                <button @click="$emit('close')" class="bg-[#5fd1ff] text-white px-4 py-2 rounded-2xl">
                    <slot name="deny"></slot>
                    {{ props.message.deny }}
                </button>
            </div>
        </div>
    </PopupModel>
</template>
<style scoped></style>