<script setup lang="ts">
defineProps<{
  showContactModal: boolean;
}>();
</script>
<template>
  <div
    v-if="showContactModal"
    class="font-poppins absolute inset-0 z-1 flex items-center justify-center rounded-2xl border border-gray-500/10 bg-white shadow-2xl shadow-black/30 lg:inset-x-30 lg:top-64 lg:h-120 2xl:inset-x-60 2xl:top-64 2xl:h-150"
  >
    <label for="" class="text-4xl">CONTACT</label>
  </div>
</template>
