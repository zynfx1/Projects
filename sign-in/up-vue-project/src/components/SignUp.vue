<script setup lang="ts">
import { ref } from 'vue';
import type { userAcc } from '../user.ts';




const isDisabled = ref(false);



const emit = defineEmits<{
(e: 'userCreated',  payload: userAcc): void
(e: 'signUpnavigate', page: string): void
}>();

const goToHome = ()=>{
emit('signUpnavigate', 'home');
};

const goToSignUp = ()=>{
emit('signUpnavigate', 'signup');
};

const newUserName = ref('');
const newUserEmail = ref('');
const newUserPassword = ref('');

const createAcc = ()=> {
    if(newUserName.value === ''|| newUserEmail.value === ''|| newUserPassword.value === ''){
        return;
    };

    const newAcc: userAcc = {
        name: newUserName.value,
        email: newUserEmail.value,
        password: newUserPassword.value,
        
    };

    emit('userCreated', newAcc);
    newUserName.value = '';
    newUserEmail.value = '';
    newUserPassword.value = '';
    isDisabled.value = true;

};




</script>
<template>
    <div class=" bg-baltic-blue-900 max-w-full h-screen font-poppins text-white">
        <header class=" bg-baltic-blue-950 w-f h-20 flex items-center justify-between px-4">
      <img class="w-18 h-18" src="C:\Users\sebig\OneDrive\Documents\Zyn Website\Click Counter\sign-in\up-vue-project\src\assets\logo5.png" alt="">
      <nav>
        <ul>
          <li class="flex items-center justify-center gap-10 text-lg">
            <a class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" @click.prevent="goToHome">Home</a> 
           
            <a class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="" @click.prevent="goToSignUp">Sign Up</a>
            <a href=""><img class="w-10 h-10" src="C:\Users\sebig\OneDrive\Documents\Zyn Website\Click Counter\sign-in\up-vue-project\src\assets\user.png" alt=""></a>
          </li>
        </ul>
      </nav>
    </header>
   
    <section class="bg-baltic-blue-900 w-full h-full flex items-center justify-center">
        <div class=" bg-white w-3/12  rounded-2xl">
            <div class="text-baltic-blue-500 w-full h-30 flex flex-col items-center justify-center ">
                
                <h1 class=" text-5xl font-semibold ">Sign Up</h1>
              
                <p class=" text-gray-500 text-center">Hello There!</p>
            </div>
            <div class="w-full h-full px-2 flex items-center justify-center rounded-es-xl rounded-ee-xl bg-baltic-blue-700">
                <form action="#" class="flex flex-col items-center justify-center py-5 w-full">
                  
                    <input v-model="newUserName" class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-user bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] " type="text" name="" id="" placeholder="Name" required>
                    <input v-model="newUserEmail" class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-email bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] invalid:border-red-500 invalid:border invalid:text-red-500 focus:invalid:outline focus:invalid:outline-red-500" type="email" name="" id="" placeholder="Email">
                    <input v-model="newUserPassword" class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-password bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] " type="text" name="" id="" placeholder="Password" required>
                    <div class="w-full flex items-center justify-center gap-2 my-2">
                        <input class=" cursor-pointer" type="checkbox" name="" id="check">
                        <label for="check">I Agree and read the Terms & Conditions</label>
                        
                    </div>
                    <div class="w-full flex items-center justify-center gap-5 my-2">
                        <button  @click="createAcc" :disabled="isDisabled" class=" w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Create Account</button>
                        <button class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Cancel</button>
                    </div>
                    <p class="w-full flex items-center justify-center gap-1 my-1">Already have an Account?<a class="text-baltic-blue-300  cursor-pointer" href="#">Sign In</a></p>
                
                </form>
            </div>
        </div>
        </section>

        <footer class=" bg-baltic-blue-950 w-full h-20">

    </footer>

    </div>
</template>