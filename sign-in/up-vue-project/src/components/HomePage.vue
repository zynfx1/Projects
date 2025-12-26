<script setup lang="ts">
import type { userAcc } from '../user.ts';
import {computed, ref} from 'vue';
import SignIn from './SignIn.vue';



const props = defineProps<{
  accountList: userAcc[]
  isLoggedIn: boolean;
}>();



const emit = defineEmits<{
(e:'navigate', page: string): void
(e: 'logout'): void
(e:'handleDelete', name: string): void

}>();

const goToHome = ()=> {
  emit('navigate', 'home');
};

const goToSignUp = ()=> {
  emit('navigate', 'signup');
};

const goToSignIn =()=> {
  emit('navigate', 'signin');
};

const logout =()=> {
  emit('logout');
};

const requestDelAcc = (userName: string) => {
  emit('handleDelete', userName);
};

</script>



<template >
  <div class=" bg-baltic-blue-900 max-w-full h-screen font-poppins text-white" >
    <header class=" bg-baltic-blue-950 w-f h-20 flex items-center justify-between px-4">
      <img class="w-18 h-18" src="/public/img/logo5.png" alt="">
      <nav>
        <ul>
          <li  class="flex items-center justify-center gap-10 text-lg">
            <a  @click.prevent="goToHome" class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="">Home</a>
             <a v-if="props.isLoggedIn" @click.prevent="logout" class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="">Logout</a>
            <a v-else-if="props.isLoggedIn === false" class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="" @click.prevent="goToSignUp">Sign Up</a>
             <a  class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="" @click.prevent="goToSignIn">Sign In</a>
            <a href=""><img class="w-10 h-10" src="/public/img/user.png" alt=""></a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="bg-baltic-blue-900 w-full h-full flex items-center justify-center">
      <div class="bg-baltic-blue-600 flex flex-col items-center justify-center p-5 rounded-lg">
        <h1 class="text-2xl">Accounts List:</h1>
        <br>
        <ul>
          <li v-for="acc in accountList" :key="acc.name" >
            <p>-------------------------------</p>
            <p>Name: {{ acc.name }}</p><br>
            <p>Email: {{ acc.email }}</p><br>
            <p>Pass: {{ acc.password }}</p><br>
            <p>-------------------------------</p>
              <button @click="requestDelAcc(acc.name)" class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Delete Account</button>
          </li>
        </ul>
      
      </div>
    </section>
    <footer class=" bg-baltic-blue-950 w-full h-20">

    </footer>
  </div>
</template>


