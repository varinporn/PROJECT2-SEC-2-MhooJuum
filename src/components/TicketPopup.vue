<script setup>
import PopupModel from './PopupModel.vue';
defineEmits(['close', 'accept'])
defineProps({
    ticketPop: Object
})
</script>
<template>
    <PopupModel @close="$emit('close')">
        <div class="bg-white p-10 rounded-4xl shadow-lg w-[20rem] md:w-[25rem] lg:w-lg ">
            <h1 class=" font-bold text-center text-[16px] md:text-xl lg:text-2xl">{{ ticketPop.concert.name }}</h1>
            <p class=" text-center text-[12px] md:text-[16px] lg:text-[20px] mt-3">Show this ticket at the entrance</p>
            <hr class=" border-[1px] my-4 rounded-2xl text-gray-300">
            <img src="/MOOHJUUM_qrcode.png" alt="" class=" w-7/9 md:w-6/9 lg:w-2/3 m-auto">
            <div class="flex justify-center">
                <div class=" rounded-2xl bg-black text-white text-[12px] md:text-[16px] py-1 px-8 md:px-12 lg:px-16 font-bold">TICKET #{{ ticketPop.id }}</div>
            </div>
            <div class=" space-y-3 mt-5">
                <div class=" flex flex-row space-x-8 items-center">
                    <img src="/icons/clock.png" alt="" class=" w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8">
                    <div class=" text-[12px] md:text-[16px] lg:text-[20px] font-medium">{{ ticketPop.concert.time }}</div>
                </div>
                <div class=" flex flex-row space-x-8">
                    <img src="/icons/date.png" alt="" class=" w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8">
                    <div class=" text-[12px] md:text-[16px] lg:text-[20px] font-medium">{{ ticketPop.concert.date }}</div>
                </div>
                <div class=" flex flex-row space-x-8">
                    <img src="/icons/pin.png" alt="" class=" w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8">
                    <div class=" text-[12px] md:text-[16px] lg:text-[20px] font-medium">{{ ticketPop.concert.location }}</div>
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button @click="$emit('close')" class="px-12 md:px-16 py-2 text-[12px] md:text-xl lg:text-2xl font-semibold cursor-pointer font-poppins bg-[#03ABEF] hover:bg-[#5fd1ff] rounded-2xl text-white transition ease-in-out duration-200">CLOSE</button>
            </div>
        </div>    
    </PopupModel>
</template>
<style scoped></style>