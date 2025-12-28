<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import { ref } from 'vue';
import type { userAcc } from './user.ts';

const savedAccs = localStorage.getItem('my_users');
const accounts = ref<userAcc[]>(savedAccs ? JSON.parse(savedAccs): []);
const isLoggedIn = ref<'loggedin' | 'logout'>('logout');
const isUserNameExist = ref(false);
const isUserEmailExist = ref(false);
const isUserPassExist = ref(false);
const currentUser = ref<userAcc | null>(null);
const currentPage = ref('home');


const saveNewUser = (user: userAcc) =>{
 const nameUserFound = accounts.value.find(acc => acc.name === user.name);
 const emailUserFound = accounts.value.find(acc => acc.email === user.email);

 if(!nameUserFound){
  isUserNameExist.value = false;

  if(emailUserFound){
  console.log('emai alrdy exist');
  isUserEmailExist.value = true;
  return;

  }else{
     isUserNameExist.value = false;
    isUserEmailExist.value = false;
    accounts.value.push(user);
    localStorage.setItem('my_users', JSON.stringify(accounts.value));
    currentUser.value = user;
    isLoggedIn.value = 'loggedin';
    currentPage.value = 'home';
  }

 }else{
  console.log('username alrdy exist');
  isUserNameExist.value = true;
   return;
 }
};

const handleLogout =()=>{
  isLoggedIn.value = 'logout';
  currentUser.value = null;
  console.log('current user log out');
};


const handleNav = (pageName: string) => {
  currentPage.value = pageName;
};

const deleteAcc = (name: string) => {
  accounts.value = accounts.value.filter(acc => acc.name !== name);
  localStorage.setItem('my_users', JSON.stringify(accounts.value));
  currentUser.value = null;
   isLoggedIn.value = 'logout';
};

const findCurrentUser = (user: userAcc) => {
 const foundUser= accounts.value.find(acc => acc.email === user.email);
if(foundUser){
  isUserEmailExist.value = false;

  if(foundUser.password === user.password){
    isUserPassExist.value = false;
     isLoggedIn.value = 'loggedin';
    currentUser.value = foundUser;
    currentPage.value = 'home';
  } else{
    isUserPassExist.value = true;
  }

} else {
  isUserEmailExist.value = true;
}



};




</script>

<template>
  <div>
    <SignUp v-if="currentPage === 'signup'" 
    @signUpnavigate="handleNav" @userCreated="saveNewUser" :isUserNameExist="isUserNameExist" :isUserEmailExist="isUserEmailExist"
    :user="currentUser"
    />
  
     <SignIn v-else-if="currentPage === 'signin'" 
     @navigate="handleNav" @requestLogAcc="findCurrentUser" :userFound="accounts"  :isUserEmailExist="isUserEmailExist" :isUserPassExist="isUserPassExist" 
     :user="currentUser"
     />


   
    
    <HomePage v-else-if="currentPage === 'home'"
     @navigate="handleNav" :accountList="accounts" :isLoggedIn="isLoggedIn" @logout="handleLogout" @handleDelete="deleteAcc" :user="currentUser"
    />

    </div>
   
</template>

