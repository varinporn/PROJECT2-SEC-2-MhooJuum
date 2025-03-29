<script setup>
import PopupModel from './PopupModel.vue';
defineEmits(['close', 'accept'])
defineProps({
    message: {
        type: Object
    },
    type : {
        type: String,
        default: 'confirm'
    } 
})
</script>
<template>
    <PopupModel @close="$emit('close')">
        <div class="bg-white w-250 min-h-60 flex flex-col p-8 rounded-2xl ">
            <div class="self-end">
                <button @click="$emit('close')">X</button>
            </div>
            <div class="self-center mb-4">
                <slot name="icon"></slot>
            </div>
            <div class="self-center text-4xl font-bold mb-8">
                {{ message.header }}
            </div>
            <div class="self-center text-xl flex-grow">
                <slot name="content">
                    {{ message.content }}
                </slot>
            </div>
            <div class="mt-16 flex gap-8" :class="type === 'success' ? 'justify-center': 'self-end justify-self-end '">
                <button v-if="type === 'confirm'" @click="$emit('close')" class="bg-[#03abef] text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#5fd1ff] transition ease-in-out duration-200" >
                    {{ message.deny }}
                </button>
                <button @click="$emit('accept')" class="font-semibold py-2 px-4 rounded-full cursor-pointer transition ease-in-out duration-200 border" :class="type === 'success' ? 'bg-[#16bc10] text-white':'border-[#03abef] text-[#03abef]'">
                    {{ message.accept }} 
                </button>
            </div>
        </div>
    </PopupModel>
</template>
<style scoped></style>