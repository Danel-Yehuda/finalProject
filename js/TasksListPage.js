window.onload = () => {
    fetch("data/ListOfTasks.json")
        .then(response => response.json())
        .then(data => {
            createListTasks(data);
        });

    fetch("data/RecommendPublish.json")
        .then(response => response.json())
        .then(data => {
            createPublish(data);
        });

    fetch("data/RecommendAddTasks.json")
        .then(response => response.json())
        .then(data => {
            AddTasks(data);
        });
};

function createListTasks(data) {
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
        publishButton.value = "Publish";
        publishButton.id = "PublishTask";
        div.appendChild(publishButton);

        li.appendChild(div);
        ul.appendChild(li);
    }
}

function createPublish(data) {
    const main = document.querySelector("main");
    const h2 = document.createElement("h2");
    h2.textContent = data.category;
    main.appendChild(h2);

    const rectangleOfPublish = document.createElement("div");
    rectangleOfPublish.id = "GrayRectangle";
    rectangleOfPublish.className = "d-flex justify-content-around rectangle-publish";
    main.appendChild(rectangleOfPublish);

    data.publishTasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-3');
        card.classList.add(task.status == '3' ? 'green' : task.status == '2' ? 'yellow' : 'red');

        card.innerHTML = `
            <i class="icon fas fa-lightbulb"></i>
            <div class="title">${task.name}</div>
            <div class="details">
                <div class="coins"><span>${task.coins}</span> <i id="coinIcon" class="fas fa-coins"></i></div>
                <div class="assigned-to">Assigned to: ${task.assignedTo}</div>
                <div class="deadline">Deadline: ${task.deadline}</div>
            </div>
            <input type="button" value="Publish" class="publish-task-button">
        `;

        card.addEventListener('click', function () {
            localStorage.setItem('taskData', JSON.stringify(task));
            window.location.href = 'taskPage.html';
        });

        const addButton = card.querySelector('.publish-task-button');
        addButton.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        rectangleOfPublish.appendChild(card);
    });

    const div = document.createElement("div");
    const slideRight = document.createElement("i");
    slideRight.className = "bi bi-arrow-right";
    div.appendChild(slideRight);
    rectangleOfPublish.appendChild(div);
}

function AddTasks(data) {
    const main = document.querySelector("main");
    const rectangleOfRecoomened = document.createElement("div");
    rectangleOfRecoomened.id = "GrayRectangle";
    rectangleOfRecoomened.className = "d-flex justify-content-around rectangle-add-tasks";
    main.appendChild(rectangleOfRecoomened);

    data.AddTasks.forEach(task => {
        const AddTask = document.createElement('div');
        AddTask.classList.add('card', 'col-md-3');

        AddTask.innerHTML = `
            <div class="title">${task.name}</div>
            <input type="button" value="Add Task" class="publish-task-button">
        `;

        rectangleOfRecoomened.appendChild(AddTask);
    });

    const div = document.createElement("div");
    const slideRight = document.createElement("i");
    slideRight.className = "bi bi-arrow-right";
    div.appendChild(slideRight);
    rectangleOfRecoomened.appendChild(div); // Corrected line
}
