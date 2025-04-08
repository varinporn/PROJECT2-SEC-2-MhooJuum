<script setup>
const props = defineProps({
  notiType: Boolean
})
</script>

<template>
  <div>
    <div
      class="fixed p-[0.8rem] bottom-8 right-8 rounded-2xl md:max-w-[20rem] border-2 shadow-3xl z-999"
      :class="props.notiType ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'"
    >
      <div class="font-semibold text-gray-800 mb-2 flex items-center -ml-[0.5rem]">
        <img
          :src="props.notiType ? '/icons/success.png' : '/icons/unsuccess.png'"
          alt="Notification icon"
          class="w-[1.5rem] mr-1"
        />
        <slot name="header" />
      </div>
      <div class="text-gray-600 text-sm">
        <p><slot name="content" /></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
