const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");


window.onload = () => {
  if (localStorage.getItem("tasks")) {
    taskList.innerHTML = localStorage.getItem("tasks");
  }
};

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function addTask() {
  let taskText = taskInput.value.trim();
  let dateTime = taskDateTime.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText} ${dateTime ? "⏰ " + dateTime : ""}</span>
    <div class="task-buttons">
      <button class="complete-btn" onclick="completeTask(this)">✓</button>
      <button class="edit-btn" onclick="editTask(this)">✎</button>
      <button class="delete-btn" onclick="deleteTask(this)">🗑</button>
    </div>
  `;

  taskList.appendChild(li);

 
  taskInput.value = "";
  taskDateTime.value = "";

  saveTasks();
}

function completeTask(btn) {
  let li = btn.parentElement.parentElement;
  li.classList.toggle("completed");
  saveTasks();
}

function editTask(btn) {
  let li = btn.parentElement.parentElement;
  let span = li.querySelector("span");
  let oldText = span.textContent;

  let newText = prompt("Edit task:", oldText);
  if (newText) {
    span.textContent = newText;
    saveTasks();
  }
}

function deleteTask(btn) {
  let li = btn.parentElement.parentElement;
  li.remove();
  saveTasks();
}
