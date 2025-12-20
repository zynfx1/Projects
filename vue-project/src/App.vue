<script setup lang="ts">
import { ref } from "vue";

interface Groceries {
  id: number;
  item: string;
  price: number;
}

const groceries = ref<Groceries[]> ([
  {id: 1, item: "Apples", price: 31},
  {id: 2, item: "Bananas", price: 11},
  {id: 3, item: "Carrots", price: 21},
]);

const removeItm = (id: number) => {
  groceries.value = groceries.value.filter(grocery => grocery.id !== id);
};

const newItemName = ref('');
const newItemPrice = ref(0);

const addNewItem = ()=> {

const newItem: Groceries = {
  id: Date.now(),
  item: newItemName.value,
  price: newItemPrice.value,
}

groceries.value.push(newItem)
  newItemName.value = ''
  newItemPrice.value = 0
};


</script>

<template>
  
  <div class="bg-jungle-green-900 max-w-screen max-h-screen text-white">
    <header class="bg-jungle-green-950 w-full h-20 flex items-center justify-between px-10">
      <img src="./logo5.png" alt="Logo" class="h-full py-1" />
      <nav>
        <ul>
          <li class="flex gap-10">
            <a href="#">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">SERVICES</a>
            <a href="#">CONTACT</a>
          </li>
        </ul>
      </nav>
    </header>

    <section

      class="bg-jungle-green-800 w-full h-screen text-center flex items-center justify-center font-poppins text-2xl"
       >
       <div class="bg-jungle-green-700 flex flex-col items-center justify-center p-5 rounded-lg shadow-lg ">
      <h1 class="font-bold bg-jungle-green-900 w-full">Grocery Store</h1>
      <!----<ul>
        <li v-for="item in groceries" :key="item.id">
         {{ item.item }} - ${{ item.price }}
        </li>
      </ul>-->
      <div class="text-lg w-full h-full flex items-center justify-center my-2">
        <form action="#">
        <label for="" class="float-left">Add Item:</label>
        <input  v-model="newItemName" type="text" class="w-full h-full bg-white text-black outline-1 outline-gray-400 text-md px-2" placeholder="Enter product name..." required>
       
        <br>
        <label for="itemPrice" class="float-left">Add Price:</label>
        <input v-model="newItemPrice" type="text" id="itemPrice" class="w-full h-full bg-white text-black outline-1 outline-gray-400 text-md px-2" placeholder="Enter product price..." required>
        <br>
        <button @click="addNewItem" class="w-3/6 h-20 my-5 bg-jungle-green-800 rounded-lg hover:bg-jungle-green-900 transition duration-200">Add Item</button>
        </form>
      </div>
      <div class="w-full h-full flex items-center justify-between flex-col  bg-jungle-green-800 py-5" >
        <h1>Inventory List:</h1>
       <ul>
        <li  v-for="item in groceries" :key="item.id" class="flex gap-20 items-center justify-between">
          {{ item.item }} - ${{ item.price }}
       
       <!-- <button class="w-3/6 h-20 bg-jungle-green-800 rounded-lg hover:bg-jungle-green-900 transition duration-200">Add Item</button>-->
        <button class=" mx-2 w-10 flex items-center justify-center rounded-xl hover:bg-jungle-green-900 hover:rounded-xl transition duration-200 text-sm" @click="removeItm(item.id)"><img src="./del.png" alt="delete" class="w-8 h-8"></button>
       
        </li>
       </ul>
       
      </div>
      
      </div>
    </section>

    <section
      class="bg-jungle-green-700 w-full h-screen flex items-center justify-center font-poppins text-2xl"
    >
    <h1 class="text-5xl text-gray-100 font-extrabold mx-5 animate-bounce"> </h1>
    </section>

    <footer
      class="w-full h-20 bg-jungle-green-950 flex items-center justify-center font-poppins text-lg"
    >
      My Vue App Footer
    </footer>
  </div>
</template>
