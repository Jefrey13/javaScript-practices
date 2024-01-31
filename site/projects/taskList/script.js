// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
const clearAllBtn = document.getElementById("clearAll");

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('en', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('en', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('en', { month: 'short' });
    dateYear.textContent = date.toLocaleString('en', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value) return;
    const task = document.createElement('div');
    const btn = document.createElement('button');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState);
    task.textContent = value;
    btn.textContent = "delete";
    btn.classList.add("taskBtn")

    btn.addEventListener('click', () => {
        task.remove();
    });
    
    task.appendChild(btn); // Agregar el botón como un hijo de task
    tasksContainer.prepend(task);
    event.target.reset();
    
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el));
};
clearAllBtn.addEventListener('click', e=>{
    tasksContainer.innerHTML = '';
});

setDate();
