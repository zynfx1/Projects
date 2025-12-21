<script setup lang="ts">

</script>
<template>
    <div class=" bg-baltic-blue-900 max-w-screen h-screen font-poppins text-white flex items-center justify-center">
        <div class=" bg-white w-3/12 h-3/8 rounded-2xl">
            <div class="text-baltic-blue-500 w-full h-30 flex flex-col items-center justify-center ">
                
                <h1 class=" text-5xl font-semibold ">Sign Up</h1>
              
                <p class=" text-gray-500 text-center">Hello There!</p>
            </div>
            <div class="w-full h-full px-2 flex items-center justify-center rounded-es-xl rounded-ee-xl bg-baltic-blue-700">
                <form action="#" class="flex flex-col items-center justify-center py-5 w-full">
                  
                    <input class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-user bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] " type="text" name="" id="" placeholder="Name" required>
                    <input class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-email bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] " type="email" name="" id="" placeholder="Emal" required>
                    <input class="w-3/4 my-2 bg-white border border-gray-500 rounded-md text-black h-8 px-7 bg-password bg-size-[auto_20px] bg-no-repeat bg-position-[left_3px_center] " type="type" name="" id="" placeholder="Password" required>
                    <div class="w-full flex items-center justify-center gap-2 my-2">
                        <input class=" cursor-pointer" type="checkbox" name="" id="check">
                        <label for="check">I Agree and read the Terms & Conditions</label>
                    </div>
                    <div class="w-full flex items-center justify-center gap-5 my-2">
                        <button class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Create Account</button>
                        <button class="w-30 h-20 rounded-lg bg-baltic-blue-800 hover:bg-baltic-blue-900 transition duration-300 cursor-pointer">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>