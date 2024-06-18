window.onload = () => {
    fetch("data/tasks.json")
        .then(response => response.json())
        .then(data => {
            createPageElements(data);
        });
        fetch("data/tasks.json")

};

function createPageElements(data) {
    const main = document.querySelector("main");
    const h1 = document.createElement("h1");
    h1.textContent = data.category;
    main.appendChild(h1);

    const addTaskButton = document.createElement("input");
    addTaskButton.id = "AddTask";
    addTaskButton.type = "button";
    addTaskButton.value = "Add New Task";
    main.appendChild(addTaskButton);

    const ul = document.createElement("ul");
    ul.className = "list-group mt-3";
    main.appendChild(ul);

    for (let i = 0; i < data.tasks.length; i++) {
        const task = data.tasks[i];
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = task.name;

        const div = document.createElement("div");

        const editIcon = document.createElement("i");
        editIcon.className = "bi bi-pencil";
        div.appendChild(editIcon);

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "bi bi-trash";
        div.appendChild(deleteIcon);

        const publishButton = document.createElement("input");
        publishButton.type = "button";
        publishButton.value = "Publish Task";
        publishButton.id = "PublishTask";
        div.appendChild(publishButton);

        li.appendChild(div);
        ul.appendChild(li);
    }
}

