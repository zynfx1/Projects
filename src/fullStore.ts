interface accs {
    id: number,
    name: string,
    pin: number,
}

interface items {
    id: number,
    item: string,
    price: number,
    stock: number
}

const accounts: accs[] = [];
let inventory: items[] = [];

console.log('--- Full Store System ---');

const createAccount = (id: number,name: string, pin: number) => {
    const newUser = {id, name,pin}; 
    accounts.push(newUser);
};


createAccount(1,'Alice',1234);
createAccount(2,'John',1111);

const addItems = (id: number,item: string,price: number,stock: number) => {
    const newItem = {id, item, price, stock};
    inventory.push(newItem);
    console.log(`Added Item: ${item}`);
};

const userToAccess = (id: number, enteredPin: number) => {
    const userFound = accounts.find((user) => user.id === id);
    if(userFound){ 
        console.log('➤ User Found');
        //console.log('-------------------------');
        
        if(enteredPin === userFound.pin){
            console.log('➤ PIN Verified');
            console.log(`User ID: ${userFound.name}`);
            addItems(1, 'Static Bar',8000,10);
            addItems(2, 'Dip Bar',1000,10);
        } 
        if(enteredPin !== userFound.pin){
                console.log('➤ Incorrect PIN');
            }

    } else {
        console.log('User not found');
       
        return true;
    }

};

userToAccess(2,1111);



console.log(' ');
console.log(' --- Current Inventory ---');
const list =() => {
    inventory.forEach((item) => {
        console.log(`Item ID: ${item.id} | ${item.item}: $${item.price} | ${item.stock}x`);
    });
};

list();


const totalInventoryValues = () => {
    let total: number = 0;
    inventory.forEach((items) => {
        total += items.price * items.stock; 
    });
    console.log(`Total Inventory Value: $${total}`);
    console.log(' ');
};

totalInventoryValues();


const deleteitems = (id: number) => {
    inventory = inventory.filter((items) => items.id !== id);
    console.log(' --- Item Deletion ---');
    console.log(`Deleted Item ID: ${id}`);
};

deleteitems(2);
console.log(' ');
console.log(' --- Updated Inventory ---');
list();
totalInventoryValues();




