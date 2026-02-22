<script setup lang="ts">
const props = defineProps<{
  showAboutModal: boolean;
}>();
</script>
<template>
  <Teleport to="body">
    <div
      v-if="showAboutModal"
      class="font-poppins absolute inset-0 flex items-center justify-center rounded-xl bg-white 2xl:inset-x-60 2xl:top-64 2xl:h-150"
    >
      <label for="" class="text-4xl">ABOUT</label>
    </div>
  </Teleport>
</template>
