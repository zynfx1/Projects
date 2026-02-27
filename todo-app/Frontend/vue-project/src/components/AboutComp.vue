<script setup lang="ts">
defineProps<{
  showAboutModal: boolean;
}>();
</script>
<template>
  <div
    v-if="showAboutModal"
    class="font-poppins absolute inset-0 z-1 flex items-center justify-center rounded-2xl border border-gray-500/10 bg-white shadow-2xl shadow-black/30 lg:inset-x-30 lg:top-64 lg:h-120 2xl:inset-x-60 2xl:top-64 2xl:h-150"
  >
    <div class="flex flex-col items-center justify-center gap-5">
      <a href="https://github.com/zynfx1" target="_blank"
        ><img
          src="../assets/img/dev.PNG"
          alt="image of creator"
          class="h-50 w-60 rounded-2xl transition duration-300 ease-in-out hover:scale-110"
      /></a>

      <p>
        A modern Todo Web App built with
        <a class="text-jungle-green-800 font-bold">Vue 3</a>,
        <a class="font-bold text-blue-950/80">TypeScript</a>, and
        <a class="font-bold text-sky-400">Tailwind CSS</a>.<br />
        Created by
        <a
          href="https://github.com/zynfx1"
          target="_blank"
          class="font-bold transition duration-200 ease-in-out hover:underline"
          >zynfx1</a
        >
        as part of my frontend/backend development portfolio.
      </p>
    </div>
  </div>
</template>
