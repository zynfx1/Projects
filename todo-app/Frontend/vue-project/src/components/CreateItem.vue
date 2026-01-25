<script setup lang="ts">
defineProps<{
  showModal: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>
<template>
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black/60"
      @click.self="$emit('close')"
    >
      <div
        class="font-poppins fixed flex flex-col items-center justify-center rounded-md bg-white 2xl:inset-x-180 2xl:inset-y-70"
      >
        <div class="m-5 flex h-full w-full flex-col items-center justify-center">
          <header class="w-full px-4 text-left text-4xl">Task Details</header>
          <form class="flex h-full w-full flex-col justify-center gap-4 bg-amber-200 px-8">
            <div class="flex flex-col">
              <label for="">Title</label>
              <input type="text" class="border" />
            </div>
            <div class="flex flex-col">
              <label for="">Deadline</label>
              <input type="date" class="border" />
            </div>
            <div class="flex flex-col">
              <label for="">Comments</label>
              <input type="text" class="border" />
            </div>
          </form>
        </div>
        <div class="my-5 flex gap-2">
          <button
            @click="$emit('close')"
            class="border-jungle-green-800 text-jungle-green-800 h-15 w-30 rounded-md border-2 transition duration-200 ease-in-out hover:bg-gray-500/10"
          >
            Close
          </button>
          <button
            class="bg-jungle-green-800 hover:bg-jungle-green-900 border-jungle-green-800 h-15 w-30 rounded-md border-2 text-white transition duration-200 ease-in-out"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
