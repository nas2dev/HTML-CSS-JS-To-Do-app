const tasks = [
    {
        id: 1,
        title: "To study React fundamentals",
        completed: false
    },
    {
        id: 2,
        title: "To study Laravel fundamentals",
        completed: false
    },
    {
        id: 3,
        title: "To study Vue fundamentals",
        completed: true
    },
    {
        id: 4,
        title: "To study Node fundamentals",
        completed: true
    },
    {
        id: 4,
        title: "To analyze shell scripts",
        completed: false
    },
]



const loadTasks = () => {

    const completedTaskList = tasks.filter(task => task.completed);
    const uncompletedTaskList =  tasks.filter(task => !task.completed);
    
    const {completedTaskNumber, uncompletedTaskNumber} = getTaskCount(tasks)
    updateTaskCount(completedTaskNumber, uncompletedTaskNumber)
    

    let taskTodoContainer = document.querySelector(".task-container-todo")
    let taskDoneContainer = document.querySelector(".task-container-done")

    uncompletedTaskList.forEach(task => {
        const tasksElement = createTaskElement(task)
        taskTodoContainer.innerHTML += tasksElement
    })


    completedTaskList.forEach(task => {
        const tasksElement = createTaskDoneElement(task)
        taskDoneContainer.innerHTML += tasksElement
    })
    

}




function addTask(){
    let inputText = document.getElementById("add_task");

    if(!validateTask()) return;

    let newTask =  {
        id: tasks.length + 1,
        title: inputText.value,
        completed: false
    }

    tasks.push(newTask)

    let taskTodoContainer = document.querySelector(".task-container-todo")
    // without animation
    // taskTodoContainer.innerHTML += createTaskElement(newTask)

    const wrapper = document.createElement("div")
    wrapper.innerHTML = createTaskElement(newTask)
    const newElement = wrapper.firstElementChild

    newElement.classList.add("fade-in")
    taskTodoContainer.appendChild(newElement)

    setTimeout(() => {
        newElement.classList.add("fade-in-active")
    }, 10);


    const {completedTaskNumber, uncompletedTaskNumber} = getTaskCount(tasks)
    updateTaskCount(completedTaskNumber, uncompletedTaskNumber)

    clearInput()
    focusInput()
}


const completeTask = (taskId) => {
    let task = tasks.find(task => task.id == taskId)
    task.completed = true;

    let taskElement = document.getElementById(`task-${task.id}`)
    // taskElement.remove()

    
    
    // without animation
    // taskDoneContainer.innerHTML += createTaskDoneElement(task)
    
    // with animation
    taskElement.classList.add("fade-out")

    setTimeout(() => {
        taskElement.remove()

        let taskDoneContainer = document.querySelector(".task-container-done")
        const taskDoneElement = createTaskDoneElement(task)

        const wrapper = document.createElement("div")
        wrapper.innerHTML = taskDoneElement
        const doneElement = wrapper.firstElementChild

        doneElement.classList.add("fade-in")
        taskDoneContainer.appendChild(doneElement)

        setTimeout(() => {
            doneElement.classList.add("fade-in-active")
        }, 10);
    }, 300);


    const {completedTaskNumber, uncompletedTaskNumber} = getTaskCount(tasks)
    updateTaskCount(completedTaskNumber, uncompletedTaskNumber)
}

const deleteTask = (taskId) => {
    let task = tasks.find(task => task.id == taskId)
    tasks.splice(tasks.indexOf(task), 1)

    let taskElement = document.getElementById(`task-${task.id}`)
    // without animation
    // taskElement.remove()

    // with animation
    taskElement.classList.add("shrink-out")

    setTimeout(() => {
        taskElement.remove() 
    }, 300)

    const {completedTaskNumber, uncompletedTaskNumber} = getTaskCount(tasks)
    updateTaskCount(completedTaskNumber, uncompletedTaskNumber)
}





// helpers

const createTaskDoneElement = (task ) => {
    return `
        <div id="task-${task.id}" class="task-container-done-list">
            <p class="task-title">${task.title}</p>
        </div>
    `
}

const createTaskElement = (task) => {
    return ` <div id="task-${task.id}" class="task-container-todo-list">
                <p class="task-title">${task.title}</p>
                <div class="task-action">
                    <button>
                        <img src="assets/Check.svg" alt="Check" onclick="completeTask(${task.id})">
                    </button>
                    <button>
                        <img src="assets/TrashSimple.svg" alt="Delete" onclick="deleteTask(${task.id})">
                    </button>
                </div>
            </div>
        `
}

const updateTaskCount = (completedTaskNumber, uncompletedTaskNumber) => {
    let completedTaskNumberElement = document.querySelector(".number-of-tasks-done")
    let uncompletedTaskNumberElement = document.querySelector(".number-of-tasks-todo")


    completedTaskNumberElement.innerHTML = completedTaskNumber
    uncompletedTaskNumberElement.innerHTML = uncompletedTaskNumber;
}


const getTaskCount = (tasks)  => {
    const completedTaskNumber = tasks.filter(task => task.completed).length;
    const uncompletedTaskNumber =  tasks.filter(task => !task.completed).length;

    return {completedTaskNumber, uncompletedTaskNumber}
}

const clearInput = () => {
    let inputText = document.getElementById("add_task");
    inputText.value = ""
}

const focusInput = () => {
    let inputText = document.getElementById("add_task");
    inputText.focus()
}

const validateTask = () => {
    let inputText = document.getElementById("add_task");
    let errorMessage = document.querySelector(".error-message")


    if (inputText.value === "" || inputText.value.trim() === "") {
        errorMessage.innerText = "Task title is required"
    }
    else {
        errorMessage.innerText = ""
    }

    return inputText.value.trim() != ""
}

loadTasks();