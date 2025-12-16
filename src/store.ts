interface items {
  item: string,
  price: number,
  stock: number
}

const inventory: items[] = [];

console.log('--- Store ---');

const addItems = ({item,price,stock}:items) => {
const newItem = {item, price, stock};
inventory.push(newItem);
console.log(`Added: ${item}`);

};

addItems({item:'Static Bar',price:8000,stock:20});
addItems({item:'Dip Bar',price:8000,stock:20});

  console.log(' ');
console.log(' --- Current Inventory ---');

const list =()=> {
inventory.forEach((item)=>{

console.log(`${item.item}: $${item.price} | ${item.stock}x`);

});


};
list();


const totalInventoryValues = () => {
let total: number = 0;
inventory.forEach((items) => {
  total += items.price * items.stock;

});
console.log(' ');
  console.log(`Total Inventory Value: $${total}`);

};


totalInventoryValues();
