<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import { ref } from 'vue';
import type { userAcc } from './user.ts';
import axios from 'axios';

//if (value) exist ? then TRUE : else FALSE

const savedAccs = localStorage.getItem('my_users');
const accounts = ref<userAcc[]>(savedAccs ? JSON.parse(savedAccs) : []);
const isUserNameExist = ref<boolean | null>(null);
const isUserEmailExist = ref<boolean | null>(null);
const isUserPassExist = ref<boolean | null>(null);
const savedActiveUser = localStorage.getItem('active_users');
const currentUser = ref<userAcc | null>(
  savedActiveUser ? JSON.parse(savedActiveUser) : null
);
const isLoggedIn = ref(currentUser.value ? 'loggedin' : 'logout');
const currentPage = ref('home');
const isModalCreateOpen = ref<boolean | null>(null);
const isModalLoginOpen = ref<boolean | null>(null);

const saveNewUser = async (user: userAcc) => {
  try {
    const response = await axios.post('http://localhost:3000/signup', user);
    currentUser.value = user;
    isLoggedIn.value = 'loggedin';
    currentPage.value = 'home';
    isModalCreateOpen.value = !isModalCreateOpen.value;
    isUserNameExist.value = false;
    isUserEmailExist.value = false;
    setTimeout(() => {
      isModalCreateOpen.value = null;
    }, 1000);
    //localStorage.setItem('my_users', JSON.stringify(accounts.value));
  } catch (error: any) {
    const type = error.response.data.errorType;

    if (type === 'USERNAME_TAKEN') {
      isUserNameExist.value = true;
      isModalCreateOpen.value = false;

      setTimeout(() => {
        isUserNameExist.value = null;
      }, 2000);
      setTimeout(() => {
        isModalCreateOpen.value = null;
      }, 1000);
    } else if (type === 'EMAIL_TAKEN') {
      isUserEmailExist.value = true;
      isModalCreateOpen.value = false;

      setTimeout(() => {
        isUserEmailExist.value = null;
      }, 2000);
      setTimeout(() => {
        isModalCreateOpen.value = null;
      }, 1000);
    }
    console.log('The messenger got lost', error);
  }
};

const handleNav = (pageName: string) => {
  currentPage.value = pageName;
};

const deleteAcc = (name: string) => {
  accounts.value = accounts.value.filter((acc) => acc.name !== name);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
  currentUser.value = null;
  isLoggedIn.value = 'logout';
  window.location.reload();
};

const findCurrentUser = async (user: userAcc) => {
  try {
    const respone = await axios.get('http://localhost:3000/check-users', {
      params: {
        email: user.email,
        password: user.password,
      },
    });
    isModalLoginOpen.value = !isModalLoginOpen.value;
    isUserPassExist.value = false;
    isLoggedIn.value = 'loggedin';
    currentUser.value = respone.data;
    currentPage.value = 'home';
    //localStorage.setItem('active_users', JSON.stringify(currentUser.value));
    setTimeout(() => {
      isModalLoginOpen.value = null;
    }, 1000);
  } catch (error: any) {
    const type = error.response.data.errorType;

    if (type === 'EMAIL_NOT_FOUND') {
      isUserEmailExist.value = true;
      isModalLoginOpen.value = false;
      setTimeout(() => {
        isUserEmailExist.value = null;
      }, 2000);
      setTimeout(() => {
        isModalLoginOpen.value = null;
      }, 1000);
    } else if (type === 'PASSWORD_INCORRECT') {
      isUserPassExist.value = true;
      isModalLoginOpen.value = false;
      setTimeout(() => {
        isUserPassExist.value = null;
      }, 2000);
      setTimeout(() => {
        isModalLoginOpen.value = null;
      }, 1000);
    }
  }
};

const handleLogout = () => {
  isLoggedIn.value = 'logout';
  currentUser.value = null;
  console.log('current user log out');
  localStorage.removeItem('active_users');
};
</script>

<template>
  <div>
    <SignUp
      v-if="currentPage === 'signup'"
      @signUpnavigate="handleNav"
      @userCreated="saveNewUser"
      :isUserNameExist="isUserNameExist"
      :isUserEmailExist="isUserEmailExist"
      :user="currentUser"
    />

    <SignIn
      v-else-if="currentPage === 'signin'"
      @navigate="handleNav"
      @requestLogAcc="findCurrentUser"
      :userFound="accounts"
      :isUserEmailExist="isUserEmailExist"
      :isUserPassExist="isUserPassExist"
      :user="currentUser"
    />

    <HomePage
      v-else-if="currentPage === 'home'"
      @navigate="handleNav"
      :accountList="accounts"
      :isLoggedIn="isLoggedIn"
      @logout="handleLogout"
      @handleDelete="deleteAcc"
      :user="currentUser"
    />

    <Teleport to="body">
      <Transition
        name="fade"
        enter-active-class="duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-50"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-y-5"
      >
        <div
          v-if="isModalCreateOpen === true"
          class="bg-green-100 flex items-center justify-center fixed w-3/17 float-right h-20 rounded-2xl z-999 text-green-800 font-poppins font-semibold lg:left-275 lg:bottom-135 2xl:left-390 2xl:bottom-208"
        >
          <div class="flex items-center justify-center text-center">
            <label for="">Successfully created an account</label>
            <button
              @click="isModalCreateOpen = null"
              class="w-4 h-4 absolute lg:left-54 lg:bottom-15 2xl:bottom-15 2xl:left-78"
            >
              <img src="/public/img/close3.png" alt="" />
            </button>
          </div>
        </div>
      </Transition>
      <Transition
        name="fade"
        enter-active-class="duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-50"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-y-5"
      >
        <div
          v-if="isModalCreateOpen === false"
          class="bg-red-100 flex items-center justify-center fixed w-3/17 float-right h-20 rounded-2xl z-999 text-red-800 font-poppins font-semibold lg:left-275 lg:bottom-135 2xl:left-390 2xl:bottom-208"
        >
          <div class="flex items-center justify-center text-center">
            <label for="">Failed to create account</label>
            <button
              @click="isModalCreateOpen = null"
              class="w-4 h-4 absolute lg:left-54 lg:bottom-15 2xl:bottom-15 2xl:left-78"
            >
              <img src="/public/img/close3.png" alt="" />
            </button>
          </div>
        </div>
      </Transition>
      <Transition
        name="fade"
        enter-active-class="duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-50"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-y-5"
      >
        <div
          v-if="isModalLoginOpen === true"
          class="bg-green-100 flex items-center justify-center fixed w-3/17 float-right h-20 rounded-2xl z-999 text-green-800 font-poppins font-semibold lg:left-275 lg:bottom-135 2xl:left-390 2xl:bottom-208"
        >
          <div class="flex items-center justify-center text-center">
            <label for="">Login Successful</label>
            <button
              @click="isModalLoginOpen = null"
              class="w-4 h-4 absolute lg:left-54 lg:bottom-15 2xl:bottom-15 2xl:left-78"
            >
              <img src="/public/img/close3.png" alt="" />
            </button>
          </div>
        </div>
      </Transition>
      <Transition
        name="fade"
        enter-active-class="duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-50"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-y-5"
      >
        <div
          v-if="isModalLoginOpen === false"
          class="bg-red-100 flex items-center justify-center fixed lg:w-3/14 2xl:w-3/17 float-right h-20 rounded-2xl z-999 text-red-800 font-poppins font-semibold lg:left-261 lg:bottom-135 2xl:left-390 2xl:bottom-208"
        >
          <div class="flex items-center justify-center text-center">
            <label for=""
              >Incorrect username or password. <br />
              Please try again</label
            >
            <button
              @click="isModalLoginOpen = null"
              class="w-4 h-4 absolute lg:left-67 lg:bottom-15 2xl:bottom-15 2xl:left-78"
            >
              <img src="/public/img/close3.png" alt="" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
