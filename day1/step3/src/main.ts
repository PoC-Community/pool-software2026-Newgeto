type Todo = { text: string; done: boolean };

const todos: Todo[] = [];

const input = document.getElementById("input") as HTMLInputElement;
const add = document.getElementById("add") as HTMLButtonElement;
const list = document.getElementById("list") as HTMLUListElement;

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.done) span.classList.add("done");

    span.onclick = () => {
      todos[index].done = !todos[index].done;
      render();
    };

    li.appendChild(span);
    list.appendChild(li);
  });
}

add.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  input.value = "";
  render();
};
