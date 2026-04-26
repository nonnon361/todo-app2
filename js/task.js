export function createTask(text, done, saveTasks, list) {
  const li = document.createElement("li");
  li.textContent = text;

  if (done) li.classList.add("done");

  li.setAttribute("draggable", "true");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks(list);
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks(list);
  });

  li.appendChild(delBtn);

  li.addEventListener("dragstart", () => {
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    saveTasks(list);
  });

  return li;
}