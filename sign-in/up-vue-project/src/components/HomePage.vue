<script setup lang="ts">
import type { userAcc } from '../user.ts';
import { computed, onMounted, ref, watch } from 'vue';
import SignIn from './SignIn.vue';
import { onUnmounted } from 'vue';
const isDelModalOpen = ref<boolean | null>(null);
const profileModal = ref<boolean | null>();
const isUserNameChange = ref(false);
const isUserEmailChange = ref(false);
const isUserPassChange = ref(false);
const newUserName = ref('');
const newUserEmail = ref('');
const newUserPass = ref('');

const toggleUserNameChange = () => {
  isUserNameChange.value = !isUserNameChange.value;
};
const toggleUserEmailChange = () => {
  isUserEmailChange.value = !isUserEmailChange.value;
};
const toggleUserPassChange = () => {
  isUserPassChange.value = !isUserPassChange.value;
};
const toggleProfileModal = () => {
  profileModal.value = !profileModal.value;
};
const toggleModal = () => {
  isDelModalOpen.value = !isDelModalOpen.value;
};

watch(isDelModalOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});

const props = defineProps<{
  accountList: userAcc[];
  user: userAcc | null;
  isLoggedIn: string;
}>();

const emit = defineEmits<{
  (e: 'navigate', page: string): void;
  (e: 'logout'): void;
  (e: 'handleDelete', name: string): void;
  (e: 'replaceCurrentUserName', acc: userAcc): void;
  (e: 'replaceCurrentUserEmail', acc: userAcc): void;
  (e: 'replaceCurrentUserPass', acc: userAcc): void;
}>();

const newUserNameProfile = () => {
  if (!props.user) {
    return;
  }
  if (newUserName.value === '') {
    return;
  }
  const user: userAcc = {
    ...props.user,
    name: newUserName.value,
  };

  emit('replaceCurrentUserName', user);
};

const newUserEmailProfile = () => {
  if (!props.user) {
    return;
  }
  if (newUserEmail.value === '') {
    return;
  }

  const user: userAcc = {
    ...props.user,
    email: newUserEmail.value,
  };

  emit('replaceCurrentUserEmail', user);
};

const newUserPassProfile = () => {
  if (!props.user?.password) {
    return;
  }

  const user: userAcc = {
    ...props.user,
    password: newUserPass.value,
  };

  emit('replaceCurrentUserPass', user);
};

const goToHome = () => {
  emit('navigate', 'home');
};

const goToSignUp = () => {
  emit('navigate', 'signup');
};

const goToSignIn = () => {
  emit('navigate', 'signin');
};

const logout = () => {
  emit('logout');
};

const requestDelAcc = (userName: string) => {
  emit('handleDelete', userName);
};
</script>
logout

<template>
  <div
    class="bg-baltic-blue-900 max-w-full h-screen font-poppins text-white body-div"
  >
    <header
      class="bg-baltic-blue-950 w-f h-20 flex items-center justify-between px-4"
    >
      <img class="w-18 h-18" src="/public/img/logo5.png" alt="" />
      <nav>
        <ul>
          <li class="flex items-center justify-center gap-10 text-lg">
            <a
              @click.prevent="goToHome"
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              href=""
              >Home</a
            >
            <a
              v-if="props.isLoggedIn === 'loggedin'"
              @click.prevent="logout"
              class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
              href=""
              >Logout</a
            >
            <div v-else-if="props.isLoggedIn === 'logout'" class="flex gap-10">
              <a
                class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
                href=""
                @click.prevent="goToSignUp"
                >Sign Up</a
              >
              <a
                class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500"
                href=""
                @click.prevent="goToSignIn"
                >Sign In</a
              >
            </div>
            <a href="#" class="flex items-center justify-center gap-5"
              ><img
                class="w-10 h-10"
                src="/public/img/user.png"
                alt="user"
              /><label v-if="props.user">{{ props.user.name }}</label></a
            >
          </li>
        </ul>
      </nav>
    </header>
    <section
      class="bg-baltic-blue-900 w-full h-full flex flex-col items-center justify-center gap-2"
    >
      <div
        class="bg-baltic-blue-600 flex flex-col items-center justify-center p-5 rounded-lg"
      >
        <h1 class="text-2xl">Profile</h1>
        <br />
        <ul>
          <li v-if="props.user">
            <p>-------------------------------------</p>
            <p>Welcome!, {{ props.user.name }}</p>
            <br />
            <p>Email: {{ props.user.email }}</p>
            <br />
            <p>Pass: {{ props.user.password }}</p>
            <br />
            <p>-------------------------------------</p>
            <div class="w-full flex items-center justify-center gap-5">
              <button
                @click="toggleModal"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Delete Account
              </button>
              <button
                @click="toggleProfileModal"
                class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            <Teleport to="body">
              <div
                v-if="profileModal"
                class="fixed inset-0 bg-white/2 backdrop-blur-xl border py-5 border-white/10 text-white font-poppins flex items-center justify-center rounded-2xl 2xl:inset-x-175 2xl:inset-y-40"
              >
                <div
                  class="w-full h-full flex flex-col items-center justify-center"
                >
                  <h1 class="text-2xl">Profile</h1>
                  <div
                    class="w-3/4 h-3/4 bg-baltic-blue-500/30 flex flex-col items-center justify-center rounded-md my-5 border border-white/10"
                  >
                    <div
                      class="w-full flex flex-col justify-center gap-1 my-2 px-5"
                    >
                      <div
                        class="w-full flex flex-col items-center justify-center"
                      >
                        <label for="" class="relative right-12"
                          >Username:
                        </label>
                      </div>
                      <div
                        class="w-full flex items-center justify-center gap-5"
                      >
                        <input
                          v-if="isUserNameChange"
                          v-model="newUserName"
                          type="text"
                          :placeholder="props.user.name"
                          class="h-full border border-gray-500 rounded-md focus:outline-1 focus:outline-sky-600 focus:border-sky-600 px-2"
                        />
                        <button
                          @click="toggleUserNameChange"
                          class="w-50 h-10 bg-baltic-blue-800 rounded-md transition duration-300 hover:bg-baltic-blue-900"
                        >
                          {{ isUserNameChange ? 'Hide' : 'Change Username' }}
                        </button>
                      </div>
                      <div class="w-full flex items-center justify-center my-2">
                        <button
                          v-if="isUserNameChange"
                          @click="newUserNameProfile"
                          class="w-40 h-10 bg-green-800 rounded-md transition duration-300 hover:bg-green-900"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>

                    <div
                      class="w-full flex flex-col justify-center gap-1 my-2 px-5"
                    >
                      <div
                        class="w-full flex flex-col items-center justify-center"
                      >
                        <label for="" class="relative right-17">Email: </label>
                      </div>
                      <div
                        class="w-full flex items-center justify-center gap-5"
                      >
                        <input
                          v-if="isUserEmailChange"
                          v-model="newUserEmail"
                          type="text"
                          :placeholder="props.user.email"
                          class="h-full border border-gray-500 rounded-md focus:outline-1 focus:outline-sky-600 focus:border-sky-600 px-2"
                        />
                        <button
                          @click="toggleUserEmailChange"
                          class="w-50 h-10 bg-baltic-blue-800 rounded-md transition duration-300 hover:bg-baltic-blue-900"
                        >
                          {{ isUserEmailChange ? 'Hide' : 'Change Email' }}
                        </button>
                      </div>
                      <div class="w-full flex items-center justify-center my-2">
                        <button
                          v-if="isUserEmailChange"
                          @click="newUserEmailProfile"
                          class="w-40 h-10 bg-green-800 rounded-md transition duration-300 hover:bg-green-900"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>

                    <div class="w-full flex flex-col justify-center gap-1 my-2">
                      <div
                        class="w-full flex flex-col items-center justify-center"
                      >
                        <label for="" class="relative right-13"
                          >Password:
                        </label>
                        <div
                          v-if="isUserPassChange"
                          class="w-full flex flex-col items-center justify-center"
                        >
                          <label
                            for=""
                            class="text-sm text-gray-400 relative right-14"
                            >Old password</label
                          >
                          <input
                            v-model="newUserPass"
                            type="text"
                            class="h-full border border-gray-500 rounded-md focus:outline-1 focus:outline-sky-600 focus:border-sky-600 px-2"
                          />
                          <label
                            for=""
                            class="text-sm text-gray-400 relative right-13"
                            >New password</label
                          >
                          <input
                            type="text"
                            class="h-full border border-gray-500 rounded-md focus:outline-1 focus:outline-sky-600 focus:border-sky-600 px-2"
                          />
                          <label
                            for=""
                            class="text-sm text-gray-400 relative right-6"
                            >Confirm new password</label
                          >
                          <input
                            type="text"
                            class="h-full border border-gray-500 rounded-md focus:outline-1 focus:outline-sky-600 focus:border-sky-600 px-2"
                          />
                        </div>
                      </div>
                      <div
                        class="w-full flex items-center justify-center gap-5 px-5"
                      >
                        <button
                          v-if="isUserPassChange"
                          class="w-50 h-10 bg-green-800 rounded-md transition duration-300 hover:bg-green-900"
                        >
                          Save Changes
                        </button>
                        <button
                          @click="toggleUserPassChange"
                          class="w-50 h-10 bg-baltic-blue-800 rounded-md transition duration-300 hover:bg-baltic-blue-900"
                        >
                          {{ isUserPassChange ? 'Hide' : 'Change Password' }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="w-full flex items-center justify-center gap-5">
                    <button
                      @click="toggleProfileModal"
                      class="w-40 h-10 bg-baltic-blue-800 rounded-md transition duration-300 hover:bg-baltic-blue-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Teleport>

            <Teleport to="body">
              <div
                v-if="isDelModalOpen === true"
                class="fixed inset-0 bg-black/5 backdrop-blur-md"
              ></div>
              <Transition
                name="fade"
                enter-active-class=" duration-500 ease-out"
                enter-from-class=" opacity-0 scale-95"
                leave-active-class="duration-300 ease-out"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 scale-80"
              >
                <div
                  v-if="isDelModalOpen === true"
                  class="fixed inset-20 z-999 bg-white flex items-center justify-center font-poppins rounded-md text-black drop-shadow-xl drop-shadow-black/30 md:inset-x-70 md:inset-y-60 lg:inset-x-100 lg:inset-y-40 2xl:inset-x-170 2xl:inset-y-70"
                >
                  <div class="flex flex-col items-center justify-center gap-3">
                    <div class="flex flex-col items-center justify-center">
                      <h1 class="text-2xl font-bold my-5 relative bottom-5">
                        Delete User
                      </h1>
                      <p>
                        Are you sure you want to delete your account,
                        <strong>{{ props.user.name }}</strong
                        >?
                      </p>
                    </div>
                    <div class="">
                      <img
                        src="/public/img/delModal.png"
                        alt=""
                        class="w-100 h-17 rounded-lg"
                      />
                    </div>
                    <div class="flex items-center justify-center gap-40">
                      <button
                        @click="toggleModal"
                        class="w-30 h-15 rounded-lg bg-baltic-blue-900 hover:bg-white hover:text-black border-2 transition duration-300 cursor-pointer text-white"
                      >
                        No, Cancel
                      </button>
                      <button
                        @click="requestDelAcc(props.user.email)"
                        class="w-30 h-15 rounded-lg bg-white border-2 hover:bg-red-700 hover:text-white hover:border-black transition duration-300 cursor-pointer"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </Teleport>
            <!--<button @click="requestDelAcc(props.user.name)" class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Delete Account</button>-->
          </li>
        </ul>
      </div>
    </section>
    <footer class="bg-baltic-blue-950 w-full h-20"></footer>
  </div>
</template>
