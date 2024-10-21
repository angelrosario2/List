let tasks = [
  { id: 1, description: "Hacer mercado", completed: false },
  { id: 2, description: "Estudiar para la prueba", completed: false },
  { id: 3, description: "Sacar a pasear a Tobby", completed: false }
];

let currentId = tasks.length; 

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => toggleTaskCompletion(index));

    const description = document.createElement('span');
    description.textContent = `${task.id}: ${task.description}`;
    if (task.completed) {
      description.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
  updateTaskCounters();
}

function addTask() {
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== '') {
    currentId++; 
    const newTask = {
      id: currentId, 
      description: taskDescription,
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = ''; 
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1); 
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function updateTaskCounters() {
  totalTasksElement.textContent = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  completedTasksElement.textContent = completedTasks;
}

addTaskButton.addEventListener('click', addTask);


renderTasks();
