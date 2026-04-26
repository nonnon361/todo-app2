function saveTasks() {
  const items = [];

  document.querySelectorAll("li").forEach(li => {
    items.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains("done")
      li.setAttribute("draggable", "true");
      li.addEventListener("dragend", () => {
  li.classList.remove("dragging");
  saveTasks();
});
    });
  });

  localStorage.setItem("tasks", JSON.stringify(items));
}
const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
button.addEventListener("click", () => {
  if (input.value === "") return;

  const li = document.createElement("li");
  li.textContent = input.value;
  li.addEventListener("click", () => {
  li.classList.toggle("done");
  saveTasks();
});

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = "";
});
delBtn.addEventListener("click", () => {
  li.remove();
  saveTasks();
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }saveTasks();
});
function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];

data.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item.text;

  if (item.done) li.classList.add("done");

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(delBtn);

    li.addEventListener("dblclick", () => {
  const newText = prompt("Edit task:", li.childNodes[0].textContent);
  if (newText) {
    li.childNodes[0].textContent = newText;
    saveTasks();
  }
});
    document.getElementById("taskList").appendChild(li);
  });
}
loadTasks();
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
function filterTasks(type) {
  document.querySelectorAll("li").forEach(li => {
    if (type === "all") {
      li.style.display = "block";
    } else if (type === "active") {
      li.style.display = li.classList.contains("done") ? "none" : "block";
    } else if (type === "done") {
      li.style.display = li.classList.contains("done") ? "block" : "none";
    }
  });
}
document.getElementById("allBtn").onclick = () => filterTasks("all");
document.getElementById("activeBtn").onclick = () => filterTasks("active");
document.getElementById("doneBtn").onclick = () => filterTasks("done");
function getDragging() {
  return document.querySelector(".dragging");
}
list.addEventListener("dragover", (e) => {
  e.preventDefault();

  const dragging = getDragging();
  const afterElement = getAfterElement(e.clientY);

  if (afterElement == null) {
    list.appendChild(dragging);
  } else {
    list.insertBefore(dragging, afterElement);
  }
});
function getAfterElement(y) {
  const elements = [...list.querySelectorAll("li:not(.dragging)")];

  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
function createTask(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;

  if (done) li.classList.add("done");

  li.setAttribute("draggable", "true");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);

  li.addEventListener("dragstart", () => {
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    saveTasks();
  });

  return li;
}