<script setup lang="ts">
import { ref } from 'vue';
import type { userAcc } from '../user.ts';

const currentUserEmail = ref('');
const currentUserPass = ref('');
const isPasswordVisible = ref(false);

const props = defineProps<{
  isUserEmailExist: boolean | null;
  isUserPassExist: boolean | null;
}>();

const emit = defineEmits<{
  (e: 'navigate', pageName: string): void;
  (e: 'requestLogAcc', userAcc: userAcc): void;
}>();

const goToHome = () => {
  emit('navigate', 'home');
};

const goToSignUp = () => {
  emit('navigate', 'signup');
};

const logInAcc = () => {
  if (currentUserEmail.value === '' || currentUserPass.value === '') {
    return;
  }

  const user: userAcc = {
    id: Date.now(),
    name: '',
    email: currentUserEmail.value,
    password: currentUserPass.value,
  };

  emit('requestLogAcc', user);
};

const clearItem = () => {
  currentUserEmail.value = '';
  currentUserPass.value = '';
};
</script>
<template>
  <div class="bg-baltic-blue-900 max-w-full h-screen font-poppins text-white">
    <header
      class="bg-baltic-blue-950 w-f h-20 flex items-center justify-between px-4"
    >
      <img
        class="w-18 h-18"
        src="/public/img/logo5.png"
        alt=""
        @click.prevent="goToHome"
      />
      <nav>
        <ul>
          <li class="flex items-center justify-center gap-10 text-lg">
            <a
              @click.prevent="goToHome"
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              >Home</a
            >

            <a
              @click.prevent="goToSignUp"
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              href=""
              >Sign Up</a
            >
            <a href=""
              ><img class="w-10 h-10" src="/public/img/user.png" alt=""
            /></a>
          </li>
        </ul>
      </nav>
    </header>

    <section
      class="bg-baltic-blue-900 w-full h-full flex items-center justify-center"
    >
      <div class="bg-white lg:w-3/8 2xl:w-3/12 rounded-2xl">
        <div
          class="text-baltic-blue-500 w-full h-30 flex flex-col items-center justify-center"
        >
          <h1 class="text-5xl font-semibold">Sign In</h1>

          <p class="text-gray-500 text-center">Welcome Back!</p>
        </div>
        <div
          class="w-full h-full px-2 flex items-center justify-center rounded-es-xl rounded-ee-xl bg-baltic-blue-700"
        >
          <form
            action="#"
            class="flex flex-col items-center justify-center py-5 w-full"
          >
            <input
              v-model="currentUserEmail"
              class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-user bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center]"
              type="text"
              name=""
              id=""
              placeholder="Email"
              required
            />
            <label
              v-if="props.isUserEmailExist === true"
              class="italic text-red-500"
              >Email not found</label
            >

            <!--<input  class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-email bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] invalid:border-red-500 invalid:border invalid:text-red-500 focus:invalid:outline focus:invalid:outline-red-500" type="email" name="" id="" placeholder="Email">-->
            <div class="w-3/4 flex items-center justify-center">
              <input
                v-model="currentUserPass"
                class="w-full my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-password bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center]"
                :type="isPasswordVisible ? 'text' : 'password'"
                name=""
                id=""
                placeholder="Password"
                required
              />

              <button
                v-if="isPasswordVisible === true"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute lg:translate-x-41 2xl:translate-x-38 cursor-pointer hover:scale-105 rounded-lg transition duration-200"
              >
                <img src="/public/img/eyeShow.png" alt="" class="w-6 h-6" />
              </button>
              <button
                v-if="isPasswordVisible === false"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute lg:translate-x-41 2xl:translate-x-38 cursor-pointer hover:scale-105 rounded-lg transition duration-200"
              >
                <img src="/public/img/eyeHide.png" alt="" class="w-5 h-5" />
              </button>
            </div>
            <label
              v-if="props.isUserPassExist === true"
              class="italic text-red-500"
              >Incorrect password</label
            >
            <div
              class="w-full flex items-center justify-center my-2 space-x-15"
            >
              <div class="w-3/6 gap-1 text-right">
                <input
                  class="cursor-pointer"
                  type="checkbox"
                  name=""
                  id="check"
                />
                <label for="check" class="mx-1">Remember me</label>
              </div>

              <div class="w-3/6">
                <a href="#" class="text-baltic-blue-200">Forgot Password?</a>
              </div>
            </div>
            <div class="w-full flex items-center justify-center gap-5 my-2">
              <button
                @click="logInAcc"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Sign In
              </button>
              <button
                @click="clearItem"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
            <p class="w-full flex items-center justify-center gap-1 my-1">
              Don't have an account?<a
                class="text-baltic-blue-200 mx-1 cursor-pointer"
                href="#"
                @click.prevent="goToSignUp"
                >Create an Acc</a
              >
            </p>
          </form>
        </div>
      </div>
    </section>

    <footer class="bg-baltic-blue-950 w-full h-20"></footer>
  </div>
</template>
