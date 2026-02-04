var todos = [];
var input = document.getElementById("input");
var add = document.getElementById("add");
var list = document.getElementById("list");
function render() {
    list.innerHTML = "";
    todos.forEach(function (todo, index) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.done)
            span.classList.add("done");
        span.onclick = function () {
            todos[index].done = !todos[index].done;
            render();
        };
        li.appendChild(span);
        list.appendChild(li);
    });
}
add.onclick = function () {
    var text = input.value.trim();
    if (!text)
        return;
    todos.push({ text: text, done: false });
    input.value = "";
    render();
};
