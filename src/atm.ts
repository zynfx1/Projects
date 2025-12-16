interface user {
    id: number,
    name: string,
    balance: number,
    pin: number
};


const bankDatabase: user[] = [];


console.log('--- ATM ---');
const createAccount = (id: number,name: string,  balance: number, pin: number) => {
const newUser = {id, name,pin,balance};
bankDatabase.push(newUser);
console.log(`Account: ${name}`);
console.log(`User Current Balance: $${balance}`);
console.log(' ');
};

createAccount(1,'John Doe',200,1111);


const deposit = (id: number, amount: number) =>{
    const foundUser = bankDatabase.find((user) => user.id === id);

    if(!foundUser){
        console.log('User not found');
        return;

    } else {
        foundUser.balance += amount;
        console.log('Depositing...');
        console.log(`Deposited: $${amount}`);
        console.log(`Total Balance: $${foundUser.balance}`);
    };

};


deposit(1,1000);


console.log(' ');
const withdraw = (id: number, amount: number, enteredPin: number) => {
    const userFound = bankDatabase.find((user) => user.id === id);

    if(userFound){ 
        console.log('Withdrawing...');
        console.log('User Found');

        if(enteredPin === userFound.pin){
            console.log('PIN Verified');

            if(amount <= userFound.balance){
                userFound.balance -= amount;
                console.log(`Withdrew: $${amount}`);
                console.log(`Remaining Balance: $${userFound.balance}`);
            } else {
                console.log('Insufficient Funds');
                return;
            }

        } else {
            console.log('Invalid PIN');
            return;
        }

    } else {
        console.log('User not found');
        return;
    }


};
withdraw(1,200,1111);

