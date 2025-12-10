const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const sectionTitle = document.getElementById("sectionTitle");
const sidebarItems = document.querySelectorAll(".sidebar li");

let currentSection = "today";

let tasks = {
    today: [],
    upcoming: []
};

// Switch sidebar section
sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        sidebarItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        currentSection = item.dataset.section;
        sectionTitle.textContent = item.textContent;

        loadTasks();
    });
});

// Add tasks (no delete)
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks[currentSection].push(text);
    taskInput.value = "";
    loadTasks();
});

// Display tasks
function loadTasks() {
    taskList.innerHTML = "";

    tasks[currentSection].forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <input type="checkbox">
            <span>${task}</span>
        `;

        taskList.appendChild(li);
    });
}

loadTasks();






