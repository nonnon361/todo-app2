export function saveTasks(list) {
  const items = [];

  list.querySelectorAll("li").forEach(li => {
    items.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains("done")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(items));
}

export function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}