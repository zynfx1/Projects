<script setup lang="ts">
import type { userAcc } from '../user.ts';
import {computed, onMounted, ref, watch} from 'vue';
import SignIn from './SignIn.vue';
const isDelModalOpen = ref<boolean | null>(null);
import { onUnmounted } from 'vue';



const toggleModal = ()=> {
  isDelModalOpen.value = !isDelModalOpen.value;
};

watch(isDelModalOpen,(newValue)=>{
  if(newValue){
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
   
  }

});





const props = defineProps<{
  accountList: userAcc[]
  user: userAcc | null
  isLoggedIn: string;
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
logout


<template >
  <div class="bg-baltic-blue-900 max-w-full h-screen font-poppins text-white body-div ">
    <header class=" bg-baltic-blue-950 w-f h-20 flex items-center justify-between px-4">
      <img class="w-18 h-18" src="/public/img/logo5.png" alt="">
      <nav>
        <ul>
          <li  class="flex items-center justify-center gap-10 text-lg" >
            <a  @click.prevent="goToHome" class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="">Home</a>
             <a v-if="props.isLoggedIn === 'loggedin'" @click.prevent="logout" class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="">Logout</a>
             <div v-else-if="props.isLoggedIn === 'logout'"  class="flex gap-10">
            <a class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="" @click.prevent="goToSignUp">Sign Up</a>
             <a class="underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-sky-500" href="" @click.prevent="goToSignIn">Sign In</a>
             </div>
            <a href="#" class="flex items-center justify-center gap-5"><img class="w-10 h-10" src="/public/img/user.png" alt='user'><label v-if="props.user" >{{ props.user.name }}</label></a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="bg-baltic-blue-900 w-full h-full flex flex-col items-center justify-center gap-2 ">
      <div class="bg-baltic-blue-600 flex flex-col items-center justify-center p-5 rounded-lg  ">
        <h1 class="text-2xl">Profile</h1>
        <br>
        <ul>
          <li v-if="props.user">
            <p>-------------------------------</p>
            <p>Welcome!, {{ props.user.name }}</p><br>
            <p>Email: {{props.user.email }}</p><br>
            <p>Pass: {{ props.user.password}}</p><br>
            <p>-------------------------------</p>
            <button @click="toggleModal" class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Delete Account</button>
            <Teleport to="body">
                <div v-if="isDelModalOpen === true" class="fixed inset-0 bg-black/5 backdrop-blur-md"></div>
              <Transition name="fade" enter-active-class=" duration-500 ease-out" enter-from-class=" opacity-0 scale-95" leave-active-class="duration-300 ease-out" leave-from-class="opacity-100" leave-to-class="opacity-0 scale-80">
                <div v-if="isDelModalOpen === true"  class="fixed inset-20 z-999 bg-white flex items-center justify-center font-poppins rounded-md text-black drop-shadow-xl drop-shadow-black/30 md:inset-x-70 md:inset-y-60 lg:inset-x-100 lg:inset-y-40 2xl:inset-x-170 2xl:inset-y-70">
                <div class="flex flex-col items-center justify-center gap-3">
                  <div class="flex flex-col items-center justify-center">
                    <h1 class=" text-2xl font-bold my-5 relative bottom-5">Delete User</h1>
                    <p>Are you sure you want to delete your account, <strong>{{ props.user.name }}</strong>?</p>
                  </div>
                  <div class="">
                    <img src="/public/img/delModal.png" alt="" class="w-100 h-17 rounded-lg">
                  </div>
                  <div class="flex items-center justify-center gap-40 ">
                    <button @click="toggleModal" class="w-30 h-15 rounded-lg bg-baltic-blue-900 hover:bg-white hover:text-black border-2  transition duration-300 cursor-pointer text-white">No, Cancel</button>
                    <button @click="requestDelAcc(props.user.name)" class="w-30 h-15 rounded-lg bg-white border-2 hover:bg-red-700 hover:text-white hover:border-black transition duration-300 cursor-pointer">Yes, Delete</button>
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
    <footer class=" bg-baltic-blue-950 w-full h-20">

    </footer>
  </div>
</template>


