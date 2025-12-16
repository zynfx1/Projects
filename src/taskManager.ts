interface task {
    id: number,
    taskName: string,
    isCompleted: boolean,
}

let todoList: task[] = [];

console.log('--- Task Manager ---');

const addTask = (id: number, taskName: string) => {
const newTask = {id, taskName, isCompleted: false};
todoList.push(newTask);
console.log(`ID: ${id} | Task: ${taskName} `);
};

addTask(1, 'Buy Milk');
addTask(2, 'Walk the Dog');
addTask(3, 'Read a Book');
console.log(' ');

const markAsCompleted = (id: number) => {
    const foundTask = todoList.find((task) => task.id === id);
    if(foundTask){
        foundTask.isCompleted = true;
        console.log(`Task Completed: ${foundTask.taskName}`);

    };
};

markAsCompleted(2);



const deleteTask = (id: number) => {
    

        todoList = todoList.filter((task) => task.id !== id);
        console.log(`Deleted ID: ${id}`);
        console.log(' ');
        console.log('--- Current Tasks ---');
        todoList.forEach((task) => {
            console.log(`ID: ${task.id} | Task: ${task.taskName} `);
        });
    
    
};

deleteTask(1);

