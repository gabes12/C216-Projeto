async function getAllTasks() {
  const tasks = await axios.get("http://localhost:3333/api/v1/task/all");

  return tasks.data;
}

async function postTask(title) {
  const task = await axios.post("http://localhost:3333/api/v1/task", {
    title,
  });

  return task.data;
}

function createTaskCard(taskId, taskStatus, taskTitle) {
  const main = document.querySelector("main");
  const lastP = document.querySelector("p:last-child");

  const li = document.createElement("li");
  li.classList.add("flex", "center-x");

  const checkbox = document.createElement("input");
  checkbox.id = taskId;
  checkbox.type = "checkbox";
  checkbox.checked = taskStatus;

  checkbox.addEventListener("change", async (e) => {
    const targetValue = e.target.checked;
    await axios.put(`http://localhost:3333/api/v1/task/${taskId}`, {
      isCompleted: targetValue,
    });
  });

  const label = document.createElement("label");
  label.htmlFor = taskId;
  label.textContent = taskTitle;

  const button = document.createElement("button");
  button.classList.add("remove");
  button.dataset.id = taskId;
  button.textContent = "Excluir";

  button.addEventListener("click", async (e) => {
    const taskId = e.target.dataset.id;
    await axios.delete(`http://localhost:3333/api/v1/task/${taskId}`);
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);

  let ul = document.querySelector("ul");
  if (ul) {
    ul.appendChild(li);
  } else {
    ul = document.createElement("ul");
    ul.classList.add("flex-col", "center-y");
    ul.appendChild(li);
    lastP.classList.add("hidden");
    main.appendChild(ul);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const { tasks } = await getAllTasks();

  const form = document.querySelector("#add_task_form");

  if (tasks) {
    tasks.forEach((task) => {
      createTaskCard(task._id, task.isCompleted, task.title);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = e.target.children[0];
    const inputValue = input.value;

    if (inputValue.trim() === "") return;

    const { task } = await postTask(inputValue);

    createTaskCard(task._id, false, inputValue);

    input.value = "";
  });
});
