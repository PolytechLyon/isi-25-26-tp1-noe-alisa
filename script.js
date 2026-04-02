document.addEventListener("DOMContentLoaded", () => {

    const tasks = [];
    const todoList = document.getElementById("todo-list");
    
    document.getElementById("new-todo-item-add").onclick = () => {
        const value = document.getElementById("new-todo-item-title").value;
        document.getElementById("new-todo-item-title").value = "";
        addItem(value);
        updateLocalStorage();
    };

    let modifyElement;
    document.getElementById("edit-todo-item-confirm").onclick = () => {
        modifyElement.innerHTML = document.getElementById("edit-todo-item-title").value;
        modifyElement = undefined;
        document.getElementById("edit-item").hidden = true;
    };

    document.getElementById("edit-todo-item-cancel").onclick = () => {
        modifyElement = undefined;
        document.getElementById("edit-item").hidden = true;
    };

    const updateLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const addItem = (title, checked) => {
        if (!title) return;

        const itemTag = todoList.appendChild(document.createElement("li")),
            check = itemTag.appendChild(document.createElement("input")),
            label = itemTag.appendChild(document.createElement("span")),
            modify = itemTag.appendChild(document.createElement("button")),
            remove = itemTag.appendChild(document.createElement("button"));

        check.type = "checkbox";
        check.checked = checked;
        label.innerHTML = title;
        modify.innerHTML = "Modifier";
        remove.innerHTML = "Supprimer";

        let index = tasks.push({ title: title, checked: Boolean(checked) }) - 1;

        check.onchange = () => {
            tasks[index].checked = check.checked;
            updateLocalStorage();
        }

        remove.onclick = () => {
            itemTag.remove();
            console.log(index);
            delete tasks[index];
            updateLocalStorage();
        };

        modify.onclick = () => {
            document.getElementById("edit-item").hidden = false;
            document.getElementById("edit-todo-item-title").title = title;
            modifyElement = label;
        }
    };

    try {
        JSON.parse(localStorage.getItem("tasks"))?.forEach(task => addItem(task?.title, task?.checked));
        updateLocalStorage();
    } catch (e){console.error(e)};
    
});