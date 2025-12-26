<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import { ref } from 'vue';
import type { userAcc } from './user.ts';

const savedAccs = localStorage.getItem('my_users');
const accounts = ref<userAcc[]>(savedAccs ? JSON.parse(savedAccs): []);
const isLoggedIn = ref(false);
const isUserEmailExist = ref(true);
const isUserPassExist = ref(true);


const saveNewUser = (user: userAcc) =>{
  accounts.value.push(user);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
  isLoggedIn.value = true;
  currentPage.value = 'home';
};

const handleLogout =()=>{
  isLoggedIn.value = false;
};


const currentPage = ref('signin');

const handleNav = (pageName: string) => {
  currentPage.value = pageName;
};

const deleteAcc = (name: string) => {
  accounts.value = accounts.value.filter(acc => acc.name !== name);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
};

const findCurrentUser = (user: userAcc) => {
 const foundUser= accounts.value.find(acc => acc.email === user.email);
if(foundUser){
  isUserEmailExist.value = true;

  if(foundUser.password === user.password){
    isUserPassExist.value = true;
    isLoggedIn.value = true;
    currentPage.value = 'home';
  } else{
    isUserPassExist.value = false;
  }

} else {
  isUserEmailExist.value = false;
}



};




</script>

<template>
  <div>
    <SignUp v-if="currentPage === 'signup'" 
    @signUpnavigate="handleNav" @userCreated="saveNewUser"
    />
  
     <SignIn v-else-if="currentPage === 'signin'" 
     @navigate="handleNav" @requestLogAcc="findCurrentUser" :userFound="accounts"  :isUserEmailExist="isUserEmailExist" :isUserPassExist="isUserPassExist"
     />


   
    
    <HomePage v-else-if="currentPage === 'home'"
     @navigate="handleNav" :accountList="accounts" :isLoggedIn="isLoggedIn" @logout="handleLogout" @handleDelete="deleteAcc"
    />

    </div>
   
</template>

