<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
  <div
    class="w-max-screen h-25 text-white flex items-center justify-center bg-pine-teal-900/10 bg-header1 bg-top hue-rotate-90 contrast-120 brightness-70 bg-no-repeat bg-size-[auto_50rem] font-poppins border-b border-gray-900/50 shadow-lg shadow-black/25"
  >
    <div
      class="w-full h-full bg-pine-teal-900/5 backdrop-blur-xs flex items-center justify-between"
    >
      <img src="../assets/img/logo.png" alt="" class="w-25 h-25 my-8 hue-rotate-260" />
      <header class="mx-8 text-2xl cursor-pointer">
        <nav>
          <ul class="flex gap-8">
            <RouterLink to="/"><li>Home</li></RouterLink>
            <RouterLink to="/todo"><li>Todo</li></RouterLink>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>
