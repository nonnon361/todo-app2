function saveTasks() {
  const items = [];

  document.querySelectorAll("li").forEach(li => {
    items.push(li.textContent.replace("X", "").trim());
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

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = "";
});
delBtn.addEventListener("click", () => {
  li.remove();
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});