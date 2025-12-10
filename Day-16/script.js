const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => li.remove();

    li.appendChild(delBtn);
    taskList.appendChild(li);
    taskInput.value = '';
}

// Optional: add task on Enter key
taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addTask();
});

