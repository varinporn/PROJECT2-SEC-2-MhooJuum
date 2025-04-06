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
        <div class="bg-white w-160 min-h-40 flex flex-col p-8 rounded-2xl md:w-180 lg:w-200">
            <div class="self-end">
                <button class="cursor-pointer" @click="$emit('close')"><img src="/icons/close.png" class="w-[20px]"></button>
            </div>
            <div class="self-center mb-4">
                <slot name="icon"></slot>
            </div>
            <div class="self-center text-3xl font-bold mb-8">
                {{ message.header }}
            </div>
            <div class="self-center text-xl">
                <slot name="content">
                    {{ message.content }}
                </slot>
            </div>
            <div class="mt-16 flex gap-8" :class="type === 'success' ? 'justify-center': 'self-end justify-self-end '">
                <button v-if="type === 'confirm'" @click="$emit('close')" class="border-[#03abef] text-[#03abef] font-semibold py-2 px-4 rounded-full cursor-pointer transition ease-in-out duration-200 border " >
                    {{ message.deny }}
                </button>
                <button @click="$emit('accept')" class="font-semibold py-2 px-4 rounded-full cursor-pointer transition ease-in-out duration-200" :class="type === 'success' ? 'bg-[#16bc10] text-white':'bg-[#03abef] text-white hover:bg-[#5fd1ff]'">
                    {{ message.accept }} 
                </button>
            </div>
        </div>
    </PopupModel>
</template>
<style scoped></style>