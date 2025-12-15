interface user {
    id: number,
    name: string,
    balance: number,
    pin: number
};


const bankDatabase: user[] = [];

const createAccount = (id: number,name: string, pin: number, initialDeposit: number) => {
console.log(`Acc: ${name}`);
};

createAccount(1,'Cacho',1111,500);


const deposit = (id: number, amount: number) =>{

};

const withdraw = (id: number, amount: number, enteredPin: number) => {

};


