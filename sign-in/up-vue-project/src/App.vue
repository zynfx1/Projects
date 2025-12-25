<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import { ref } from 'vue';
import type { userAcc } from './user.ts';

const savedAccs = localStorage.getItem('my_users');
const accounts = ref<userAcc[]>(savedAccs ? JSON.parse(savedAccs): []);
const isLoggedIn = ref(false);

const saveNewUser = (user: userAcc) =>{
  accounts.value.push(user);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
  isLoggedIn.value = true;
  currentPage.value = 'home';
};

const handleLogout =()=>{
  isLoggedIn.value = false;
};


const currentPage = ref('home');

const handleNav = (pageName: string) => {
  currentPage.value = pageName;
};

const deleteAcc = (name: string) => {
  accounts.value = accounts.value.filter(acc => acc.name !== name);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
};



</script>

<template>
  <div class="">
    <SignUp v-if="currentPage === 'signup'" 
    @signUpnavigate="handleNav" @userCreated="saveNewUser"
    />

    <HomePage v-else-if="currentPage === 'home'"
     @homeNavigate="handleNav" :accountList="accounts" :isLoggedIn="isLoggedIn" @logout="handleLogout" @handleDelete="deleteAcc"
    />

    
    <SignIn v-else-if="currentPage === 'signin'"
    @navigate="handleNav"
    />


   </div>
</template>

