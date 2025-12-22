<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import { ref } from 'vue';
import type { userAcc } from './user.ts';

const accounts = ref<userAcc[]>([]);

const saveNewUser = (user: userAcc) =>{
  accounts.value.push(user);
};

const currentPage = ref('home');

const handleNav = (pageName: string) => {
  currentPage.value = pageName;
};

</script>

<template>
  <div class="">
    <SignUp v-if="currentPage === 'signup'" 
    @signUpnavigate="handleNav" @userCreated="saveNewUser"
    />

    <HomePage v-else-if="currentPage === 'home'"
     @homeNavigate="handleNav" :accountList="accounts"
    />

    
    <SignIn v-else-if="currentPage === 'signin'"

    />


   </div>
</template>

