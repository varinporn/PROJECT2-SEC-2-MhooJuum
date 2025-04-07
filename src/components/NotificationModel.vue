<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  status: {
    type: Boolean
  }
})

const showNotification = ref(false)
watch(() => props.status, (newVal) => {
    console.log('j');
  if (newVal) {
    showNotification.value = true

    setTimeout(() => {
      showNotification.value = false
    }, 5000)
  }
})


</script>

<template>
    <div>
        <div v-show="showNotification" class=" fixed bottom-8 right-8 rounded-2xl w-70 h-40 bg-white shadow-2xl border-1 border-gray-200">
            <div class=" p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped></style>