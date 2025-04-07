<script setup>
import PopupModel from './PopupModel.vue';
defineEmits(['close', 'accept'])
defineProps({
    message: {
        type: Object
    },
    type: {
        type: String,
        default: 'confirm'
    }
})
</script>
<template>
    <PopupModel @close="$emit('close')">
        <div class="bg-white max-w-[650px] sm:w-[500px] lg:w-[650px] min-h-40 flex flex-col p-6 sm:p-8 rounded-2xl mx-4">
            <div class="self-end">
                <button @click="$emit('close')" class="cursor-pointer">
                    <img src="/icons/close.png" class="w-5" />
                </button>
            </div>

            <div class="self-center mb-4">
                <slot name="icon"></slot>
            </div>

            <div class="self-center text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
                {{ message.header }}
            </div>

            <div class="self-center text-center text-sm sm:text-base lg:text-xl w-full px-2">
                <slot name="content">
                    {{ message.content }}
                </slot>
            </div>

            <div class="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center sm:justify-end"
                :class="{ 'justify-center': type === 'success' }">
                <button v-if="type === 'confirm'" @click="$emit('close')"
                    class="border border-[#03abef] text-[#03abef] font-semibold py-2 px-4 rounded-full transition">
                    {{ message.deny }}
                </button>
                <button @click="$emit('accept')"
                    :class="type === 'success' ? 'bg-[#16bc10] mx-auto' : 'bg-[#03abef] hover:bg-[#5fd1ff]'"
                    class="text-white font-semibold py-2 px-4 rounded-full transition">
                    {{ message.accept }}
                </button>
            </div>
        </div>
    </PopupModel>

</template>
<style scoped></style>