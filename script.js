const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const totalTasks = document.getElementById("totalTasks");

addBtn.addEventListener("click", addTodoItem);
todoList.addEventListener("click", handleTodoItemClick);

function addTodoItem() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    todoInput.value = "";
    updateTotalTasks();
  }
}

function createTodoItem(text) {
  const todoItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const deleteBtn = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleTodoItem);
  todoItem.appendChild(checkbox);

  todoText.textContent = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  todoItem.appendChild(deleteBtn);

  todoItem.classList.add("todo-item");
  return todoItem;
}

function toggleTodoItem(event) {
  const todoItem = event.target.parentNode;
  todoItem.classList.toggle("checked");
  updateTotalTasks();
}

function handleTodoItemClick(event) {
  if (event.target.classList.contains("delete-btn")) {
    const todoItem = event.target.parentNode;
    todoList.removeChild(todoItem);
    updateTotalTasks();
  }
}

function updateTotalTasks() {
  const taskCount = todoList.getElementsByTagName("li").length;
  totalTasks.textContent = `Total Tasks: ${taskCount}`;
}
