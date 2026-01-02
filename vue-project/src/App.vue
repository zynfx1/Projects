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
if(newItemName.value === '' && newItemPrice.value === 0){
return;
}

if(newItemPrice.value <= 0){
  const message = JSON.stringify("Please input a valid price value.");
  alert(message);
  return;
}

const newItem: Groceries = {
  id: Date.now(),
  item: newItemName.value.charAt(0).toUpperCase() + newItemName.value.slice(1),
  price: newItemPrice.value,
}
groceries.value.push(newItem)

};


const resetItem = ()=> {

  
newItemName.value = "";
newItemPrice.value = 0;

};

const findItems = (items: string) => {
  const foundItem = groceries.value.find(item => item.item === items);
  console.log(foundItem)
};

</script>

<template>
  <div class="bg-jungle-green-950 min-h-screen text-white font-poppins">
    <header class="bg-black/20 backdrop-blur-md sticky top-0 z-50 w-full h-20 flex items-center justify-between px-10 border-b border-white/10">
      <img src="./logo5.png" alt="Logo" class="h-12" />
      <nav>
        <ul class="flex gap-10 text-sm font-semibold tracking-widest">
          <li><a href="#" class="hover:text-jungle-green-400">HOME</a></li>
          <li><a href="#" class="hover:text-jungle-green-400">ABOUT</a></li>
          <li><a href="#" class="hover:text-jungle-green-400">CONTACT</a></li>
        </ul>
      </nav>
    </header>

    <section class="relative w-full min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-jungle-green-900 via-jungle-green-800 to-black">
      
      <label class="absolute top-1/2 left-1/3 -z-10 text-9xl font-bold opacity-10">GROCERIES</label>

      <div class="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 class="text-3xl font-bold mb-6 text-center tracking-tight">Grocery Store</h1>
        
        <div class="space-y-4 mb-8">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-gray-400">Item Name</label>
            <input v-model="newItemName" type="text" class="bg-white/10 border border-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 transition" placeholder="Apples...">
          </div>
          
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-gray-400">Price</label>
            <input v-model="newItemPrice" type="number" class="bg-white/10 border border-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 transition">
          </div>

          <div class="flex gap-3 pt-2">
            <button @click.prevent="addNewItem" class="flex-1 bg-jungle-green-600 hover:bg-jungle-green-500 py-3 rounded-xl font-bold transition">Add Item</button>
            <button @click.prevent="resetItem" class="px-6 bg-white/10 hover:bg-white/20 rounded-xl transition">Reset</button>
          </div>
        </div>

        <hr class="border-white/10 mb-6">

        <div class="space-y-4">
          <h2 class="text-lg font-bold">Current Inventory</h2>
          <p v-if="groceries.length === 0" class="text-gray-500 italic">No items in stock.</p>
          
          <ul class="space-y-2">
            <li v-for="item in groceries" :key="item.id" class="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <p class="font-bold">{{ item.item }}</p>
                <p class="text-sm text-jungle-green-400">${{ item.price }}</p>
              </div>
              <div class="flex gap-2">
                <button @click="findItems(item.item)" class="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20">Find</button>
                <button @click="removeItm(item.id)" class="p-2 hover:bg-red-500/20 rounded-lg group transition">
                   <img src="./del.png" alt="delete" class="w-5 h-5 opacity-70 group-hover:opacity-100">
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
