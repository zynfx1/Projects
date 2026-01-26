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
    <Transition
      name="fade"
      enter-active-class="duration-500 ease-out"
      enter-from-class="opacity-0 "
      leave-active-class="duration-300 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black/60"
        @click.self="$emit('close')"
      >
        <div
          class="font-poppins fixed flex flex-col items-center justify-center rounded-md border border-black/60 bg-white 2xl:inset-x-180 2xl:inset-y-63"
        >
          <div class="m-5 flex h-full w-full flex-col items-center justify-center">
            <div class="flex h-full w-full items-center justify-between">
              <header class="mx-4 w-full text-left text-4xl">Task Details</header>
              <img
                src="../assets/img/close.png"
                alt=""
                class="relative bottom-9 mx-3 h-7 w-7 transition duration-200 ease-in-out hover:scale-110"
                @click="$emit('close')"
              />
            </div>
            <form class="flex h-full w-full flex-col justify-center gap-4 px-8">
              <div class="flex flex-col">
                <label for="">Title</label>
                <input
                  type="text"
                  class="rounded-sm border border-black/30 px-1"
                  placeholder="Add a task title"
                />
              </div>
              <div class="flex flex-col">
                <label for="">Deadline</label>
                <input type="date" class="rounded-sm border border-black/30 px-1" required />
              </div>
              <div class="flex flex-col">
                <label for="">Comment</label>
                <textarea
                  class="flex h-20 resize-none items-start rounded-sm border border-black/30 p-1"
                  placeholder="Write your comment here..."
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div class="my-5 flex w-full justify-end gap-2 px-8">
            <button
              @click="$emit('close')"
              class="border-jungle-green-800 text-jungle-green-800 h-13 w-30 cursor-pointer rounded-md border-2 transition duration-200 ease-in-out hover:bg-gray-500/10"
            >
              Close
            </button>
            <button
              class="bg-jungle-green-800 hover:bg-jungle-green-900 border-jungle-green-800 h-13 w-30 cursor-pointer rounded-md border-2 text-white transition duration-200 ease-in-out"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
