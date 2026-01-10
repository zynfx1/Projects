<script setup lang="ts">
import { ref } from 'vue';
import type { userAcc } from '../user.ts';

const newUserName = ref('');
const newUserEmail = ref('');
const newUserPassword = ref('');
const isPasswordVisible = ref(false);

const props = defineProps<{
  isUserNameExist: boolean | null;
  isUserEmailExist: boolean | null;
}>();

const emit = defineEmits<{
  (e: 'userCreated', payload: userAcc): void;
  (e: 'signUpnavigate', page: string): void;
  (e: 'isClose'): void;
}>();

const goToHome = () => {
  emit('signUpnavigate', 'home');
};

const goToSignIn = () => {
  emit('signUpnavigate', 'signin');
};

const createAcc = () => {
  if (
    newUserName.value === '' ||
    newUserEmail.value === '' ||
    newUserPassword.value === ''
  ) {
    return;
  }

  const newAcc: userAcc = {
    id: Date.now(),
    name: newUserName.value,
    email: newUserEmail.value,
    password: newUserPassword.value,
  };

  emit('userCreated', newAcc);

  newUserName.value = '';
  newUserEmail.value = '';
  newUserPassword.value = '';
};

const clearItems = () => {
  newUserName.value = '';
  newUserEmail.value = '';
  newUserPassword.value = '';
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
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              @click.prevent="goToHome"
              >Home</a
            >

            <a
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              href=""
              @click.prevent="goToSignIn"
              >Sign In</a
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
          <h1 class="text-5xl font-semibold">Sign Up</h1>

          <p class="text-gray-500 text-center">Hello There!</p>
        </div>
        <div
          class="w-full h-full px-2 flex items-center justify-center rounded-es-xl rounded-ee-xl bg-baltic-blue-700 transition-transform"
        >
          <form
            action="#"
            class="flex flex-col items-center justify-center py-5 w-full"
          >
            <input
              v-model="newUserName"
              class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-user bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center]"
              type="text"
              name=""
              id=""
              placeholder="Username"
            />
            <Transition
              name="fade"
              enter-active-class="duration-500 ease-out"
              enter-from-class="opacity-100 scale-90"
              leave-active-class="duration-300 ease-out"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 scale-50"
            >
              <label
                v-if="props.isUserNameExist === true"
                class="italic text-red-500"
                >Username already exist</label
              >
            </Transition>
            <input
              v-model="newUserEmail"
              class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-email bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center]"
              type="email"
              name=""
              id=""
              placeholder="Email"
              required
            />
            <Transition
              name="fade"
              enter-active-class="duration-500 ease-out"
              enter-from-class="opacity-100 scale-90"
              leave-active-class="duration-300 ease-out"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 scale-50"
            >
              <label
                v-if="props.isUserEmailExist === true"
                class="italic text-red-500"
                >Email already exist</label
              >
            </Transition>
            <div class="w-3/4 flex items-center justify-center">
              <input
                v-model="newUserPassword"
                class="w-full my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-password bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center]"
                :type="isPasswordVisible ? 'text' : 'password'"
                name=""
                id=""
                placeholder="Password"
                minlength="8"
                maxlength="20"
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
            <div class="w-full flex items-center justify-center gap-2 my-2">
              <input
                class="cursor-pointer"
                type="checkbox"
                name=""
                id="check"
                required
              />
              <label for="check"
                >I Agree and read the
                <a href="#" class="text-baltic-blue-300"
                  >Terms & Conditions</a
                ></label
              >
            </div>
            <div class="w-full flex items-center justify-center gap-5 my-2">
              <button
                @click="createAcc"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Create Account
              </button>
              <button
                @click="clearItems"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
            <p class="w-full flex items-center justify-center gap-1 my-1">
              Already have an Account?<a
                class="text-baltic-blue-300 cursor-pointer"
                href="#"
                @click.prevent="goToSignIn"
                >Sign In</a
              >
            </p>
          </form>
        </div>
      </div>
    </section>

    <footer class="bg-baltic-blue-950 w-full h-20"></footer>
  </div>
</template>
